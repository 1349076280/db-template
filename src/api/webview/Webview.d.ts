/**
 * 通用浏览器跳转配置
 */
interface IWebviewOptions {
  /**
   * 拼接在URL后的参数
   */
  query: AnyObject,
}

/**
 * 中焯Webview配置项
 */
interface ITztWebviewOptions extends IWebviewOptions {
  /**
   * 隐藏原生头部
   */
   hiddenNativeTitle: boolean,
  /**
   * 隐藏原生头部分享
   */
   hiddenNativeTitleShare: boolean,
  /**
   * 登录的类型
   */
   loginType:number,
}

/**
 * 思迪商城Webview配置项
 */
interface IThinkiveOptions extends IWebviewOptions {
}

/**
 * 优品投顾Webview配置项
 */
interface IUPOptions extends IWebviewOptions {
}