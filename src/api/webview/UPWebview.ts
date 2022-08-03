import {onJsOverrideUrlLoading} from './configFun'
/**
 * todo 通过优品Webview打开链接
 * @param url 
 * @param options 
 */

export function openUPUrl(url :string, options: IUPOptions){
  if(JSON.stringify(options.query) !== '{}'){
     //如果url地址后没有参数url后要拼接？，如果有拼接&
    if(url.indexOf('?')==-1){
      url+='?'
    }else{
      url+='&'
    }
    for(let key in options.query){
      url+=key+'='+options.query[key]+'&&'
    }
    url=url.slice(0,-2)
  }
  url='http://action:58233/?url='+encodeURIComponent('{"tzt_upType":10,"url":"'+url+'"}')
  onJsOverrideUrlLoading(url)
}
