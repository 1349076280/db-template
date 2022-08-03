 export function onJsOverrideUrlLoading(str: string): void {
    var app = navigator.appVersion,
        appversion = app.toLocaleLowerCase()
    if (appversion.indexOf("windows phone") > 0) {
        (window.external as any).notify(str);
    } else if (appversion.indexOf("iphone") > 0) {
        window.location.href = str;
    } else if (appversion.indexOf("android") > 0) {
        (window as any).MyWebView.onJsOverrideUrlLoading(str);
    } else {
        window.location.href = str;
    }
};