import {onJsOverrideUrlLoading} from './configFun'

export function changeUrl(url: string) {
    onJsOverrideUrlLoading(url);
}
/**
 * todo 通过思迪Webview打开链接
 * @param url
 * @param options
 */
export function openThinkiveUrl(url :string, options: IThinkiveOptions){
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
    url='http://action:58230/?url='+encodeURIComponent(url)
    onJsOverrideUrlLoading(url)
}
