interface NetParams extends AnyObject {
    /** 需要序列化的字段 */
    _serializationFields?: Array<string>,
    /** 请求成功回调函数 */
    _success?: Function,
    /** 请求失败回调函数 */
    _fail?: Function,
    /** 请求完成回调函数（无论请求是否成功都会执行） */
    _complete?: Function
}

interface NetBaseConfig extends NetConfig {
    /** 网络请求根路径 */
    baseUrl: string,
    canNoJson?: boolean,
    baseSuccess?: Function,
    baseFail?: Function,
    baseComplete?: Function,
    /** 字符串序列化成json字段 */
    serializationField?: string
}

interface NetQueryConfig extends NetConfig {
    method: "GET"|"POST",
    body?: any,
}

interface NetConfig {
    /** 是否开启跨域 */
    mode?: "cors" | "no-cors" | "same-origin",
    credentials?: "omit" | "include" | "same-origin",
    headers?: any
}

interface NetResponse {
    /** 返回值是否必须为 JSON */
    _isJson?: boolean,
}

interface NetReq {
    errCode: number,
    errMsg: string,
    data: any
}

interface TztCommonResponse<T> {
    ERRORNO: string,
    ACTION: string,
    DATA: T,
}

