/**
 * 网络请求基类
 * @author PHCS
 * @author 子不语<zz@pohun.com>
 */
/**
 * 前端框架异常
 */
export class FrontFrameworkError extends Error {

    constructor(message: string) {
        super(message);
    }
}

export default class NetBase {

    private config = {} as NetBaseConfig

    constructor(config: NetBaseConfig) {
        for (let key in config) {
            this.config[key as keyof NetBaseConfig] = config[key as keyof NetBaseConfig]
        }
    }

    async post<T>(url: string, params: NetParams = {}): Promise<T> {
        url = this.config.baseUrl  + url;
        return NetBase.spost<T>(url, params, this.config)
    }

    async getAjax<T>(params: NetParams = {}): Promise<T> {
        /**
         * 请求服务器(0:行情;1:交易;2:资讯)
         */
        params.ReqlinkType = 2;
        return NetBase.sget(this.config.baseUrl, params, this.config);
    }

    static create(config: NetBaseConfig) {
        return new NetBase(config);
    }
    static async spost<T>(url: string, params: NetParams = {}, config?: NetConfig): Promise<T> {
        let _config: NetQueryConfig = {
            method: 'POST',
            body: NetBase.getParams(params),
            mode: config?.mode || "cors",
            credentials: config?.credentials || "include",
            headers: config?.headers || {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        // 拦截器，但是为什么要拦截？
        // config = config as NetBaseConfig;
        // _config = config.Interceptor && config.Interceptor.post ? config.Interceptor.post(_config) || _config;
        if (_config.headers["Content-Type"] === "application/x-www-form-urlencoded") {
            _config.body = NetBase.params2Params(_config.body)
        }
        // _config = NetBase.interceptor.post(_config);
        return NetBase.request<T>(url, _config, params, config as NetBaseConfig);
    }

    static async sget<T>(url: string, params: NetParams = {}, config?: NetConfig): Promise<T> {
        let _config: NetQueryConfig = {
            method: "GET",
            mode: config?.mode || "cors",
            credentials: config?.credentials || "include"
        }
        let _params: AnyObject = NetBase.getParams(params);
        url = NetBase.params2GetUrl(url, _params);
        // 请求拦截器
        // config = config as NetBaseConfig;
        // _config = config.Interceptor && config.Interceptor.get ? config.Interceptor.get(_config) || _config;
        return NetBase.request<T>(url, _config, params, config as NetBaseConfig)
    }

    /** 获取请求数据（私有） */
    private static getParams(obj: NetParams): AnyObject {
        let param: AnyObject = {};
        for (let key in obj) {
            if (!['_success', '_fail', '_complete'].includes(key)) param[key] = obj[key];
        }
        return param;
    }

    private static params2Params(obj: AnyObject | string): string {
        if (typeof obj == "string") obj = JSON.parse(obj) as AnyObject;
        let params: string[] = []
        for (let key in obj) {
            // 如果为数组或对象就格式化为 json字符串
            // if (typeof obj[key] === "object") obj[key] = JSON.stringify(obj[key]);
            if (typeof obj[key] === "object") obj[key] = encodeURIComponent(JSON.stringify(obj[key]));
            // 过滤空数据
            if (obj[key] === null || obj[key] === undefined) continue;
            params.push(key + '=' + obj[key]);
        }
        return params.join("&");
    }

    private static params2GetUrl(url: string, obj: AnyObject | string): string {
        let sparam = this.params2Params(obj);
        let and: string = "?";
        if (url.includes("?")) and = "&";
        sparam = sparam ? and + sparam : "";
        return url + sparam;
    }

    private static async request<T>(url: string, config: NetConfig, params: NetParams, baseConfig?: NetBaseConfig): Promise<T> {
        return new Promise<T>((resolve: (value: T) => void, reject: (reason?: any) => void) => {
            fetch(url, config)
                .then(res => {
                    if (res.status === 200) {
                        res.json()
                            .then(json => {
                                // 将json字符串序列化
                                try {
                                    // 默认配置
                                    if (baseConfig?.serializationField && json && json[baseConfig?.serializationField]) {
                                        json[baseConfig?.serializationField] = JSON.parse(json[baseConfig?.serializationField]);
                                    }
                                } catch (e) {
                                    return Promise.reject(new FrontFrameworkError(`尝试对响应列${baseConfig?.serializationField}进行JSON序列化失败`));
                                }
                                try {
                                    // 接口配置
                                    if (params?._serializationFields && params?._serializationFields.length > 0) {
                                        for (let i = 0; i < params._serializationFields.length; i++) {
                                            if (json && json[params._serializationFields[i]]) {
                                                json[params._serializationFields[i]] = JSON.parse(json[params._serializationFields[i]]);
                                            }
                                        }
                                    }
                                } catch (e) {
                                    return Promise.reject(new FrontFrameworkError(`尝试对响应列${params?._serializationFields}进行JSON序列化失败`));
                                }
                                if (baseConfig?.baseSuccess) json = baseConfig.baseSuccess(json) || json;
                                if (baseConfig?.baseComplete) baseConfig.baseComplete(json);
                                if (params._success) params._success(json);
                                if (params._complete) params._complete(json);
                                resolve(json);
                            })
                            .catch(err => {
                                if (baseConfig?.canNoJson) {
                                    res.text()
                                        .then(text => {
                                            if (baseConfig?.baseSuccess) baseConfig.baseSuccess(text);
                                            if (baseConfig?.baseComplete) baseConfig.baseComplete(text);
                                            if (params._success) params._success(text);
                                            if (params._complete) params._complete(text);
                                            resolve(text as any);
                                        })
                                        .catch(err => {
                                            if (baseConfig?.baseFail) err = baseConfig.baseFail(err) || err;
                                            if (baseConfig?.baseComplete) baseConfig.baseComplete(err);
                                            if (params._fail) params._fail(err);
                                            if (params._complete) params._complete(err);
                                            reject(err);
                                        })
                                } else {
                                    if (baseConfig?.baseFail) err = baseConfig.baseFail(err) || err;
                                    if (baseConfig?.baseComplete) baseConfig.baseComplete(err);
                                    if (params._fail) params._fail(err);
                                    if (params._complete) params._complete(err);
                                    reject(err);
                                }
                            })
                    } else {
                        if (baseConfig?.baseFail) res = baseConfig.baseFail(res) || res;
                        if (baseConfig?.baseComplete) baseConfig.baseComplete(res);
                        if (params._fail) params._fail(res);
                        if (params._complete) params._complete(res);
                        reject(res);
                    }
                })
                .catch(res => {
                    if (baseConfig?.baseFail) res = baseConfig.baseFail(res) || res;
                    if (baseConfig?.baseComplete) baseConfig.baseComplete(res);
                    if (params._fail) params._fail(res);
                    if (params._complete) params._complete(res);
                    reject(res);
                })
        })
    }


}
