import {onJsOverrideUrlLoading} from './configFun'
/**
 * todo 通过中焯Webview打开链接
 * @param url 
 * @param options 
 */
export function openUrl(url :string, options: ITztWebviewOptions){
    //如果url地址后没有参数url后要拼接？，如果有拼接&
    if(url.indexOf('?')==-1){
        url+='?'
    }else{
        url+='&'
    }
    if(JSON.stringify(options.query) !== '{}'){
        for(let key in options.query){
            url+=key+'='+options.query[key]+'&'
        }
    }
    //去掉末尾链接符
    url=url.slice(0,-1)
    url='http://action:10061/?fullscreen=1&&firsttype=10&&secondtype=9&&url='+encodeURIComponent(url) 
    if (options.hiddenNativeTitle) {
        url = url.replace("?fullscreen=1", "?fullscreen=1&&tzthiddentitle=1")
    }
    if (options.hiddenNativeTitleShare) {
        url = url.replace("?fullscreen=1", "?fullscreen=1&&thirdtype=1")
    }
    if([-1,0,1.1,1.2,1.3,2,8,9,11,12,13].indexOf(options.loginType) == -1){
        console.log('错误的登录类型')
        return
    }
    //loginType -1不登录 0系统登录 1.1普通交易弱权限登录,1.2普通交易登录强权限登录,1.3普通交易登录添加账号 2融资融券登录 8个股期权登录 9融资融券担保品划转登录
    //11商城相关页面调用客户端登录 12社区页面调用客户端登录 13财人汇掌厅和融微贷调用客户端登录
    if(options.loginType!=-1){
        switch (options.loginType) {
            case 0: //系统登录
                url = 'http://action:10301/?url='+encodeURIComponent(url);
                break;
            case 1.1: //普通交易登录-弱权限登录
                url = 'http://action:10090/?loginType=1&&loginKind=0&&url='+encodeURIComponent(url);
                break;
            case 1.2: //普通交易登录-强权限登录
                url = 'http://action:10090/?loginType=1&&loginKind=1&&url='+encodeURIComponent(url);
                break;
            case 1.3: //普通交易登录-添加账号
                url = 'http://action:10090/?loginType=1&&loginKind=2&&url='+encodeURIComponent(url);
                break;
            default:
                //融资融券登录，个股期权登录，融资融券担保品划转登录，商城相关页面调用客户端登录，社区页面调用客户端登录，财人汇掌厅和融微贷调用客户端登录
                url = 'http://action:10090/?loginType=' + options.loginType + '&&loginKind=0&&url='+encodeURIComponent(url);
                break;
        }
    }
    onJsOverrideUrlLoading(url)
}
