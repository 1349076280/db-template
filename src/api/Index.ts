import Base from '@/lib/ts/Base'
import NetBase, {FrontFrameworkError} from "@/lib/ts/NetBase";
import {DEFAULT_MESSAGES} from "@/lib/ts/GeneralMessages";
import {CUSTOMER_MESSAGES} from "@/lib/ts/CustomerMessages";

const MESSAGES = {
    ...DEFAULT_MESSAGES,
    ...CUSTOMER_MESSAGES,
};
const
    XML = '/reqxml',
    LOCAL = '/reqlocal',
    BINARY = '/reqbinary',
    SAVE_MAP = '/reqsavemap',
    READ_MAP = '/reqreadmap',
    SAVE_FILE = '/reqsavefile',
    SOFT_TODO = '/reqsofttodo',
    LOAD_FILE = 'reqloadfile',
    SIGNATURE = 'reqsignature',
    TZT_VIDEO = '/tztvideo';

// 共同参数封装
export const requestAjaxEngine = Base.NetBase.create({
    baseUrl: XML,
    serializationField: "DATA",
    baseFail: (err: AjaxEngineResponse<any> | FrontFrameworkError)=> {
        if(err instanceof FrontFrameworkError){
            console.error(`前端框架发生异常: %s`, err.message);
        } else {
            // 后端返回异常处理
            const { ERRORNO } = err;
            // 异地登录
            if (ERRORNO === "-101" || ERRORNO === "-102" || ERRORNO === "-103" || ERRORNO === "-104") {
                console.log(MESSAGES[ERRORNO]);
                // todo dialog when
            }
            // 参数校验异常
            if (ERRORNO === "-403") {
                console.log(MESSAGES[ERRORNO]);
                // todo dialog when
            }
            // 未知异常处理
            if (ERRORNO === "-999") {
                console.log(MESSAGES[ERRORNO]);
                // todo dialog when
            }

        }
    },
    baseSuccess: (res: AjaxEngineResponse<any>) => {
        console.log(`通用响应处理: 请求成功`);
        console.log(`响应打印: %o`, res);
    }
});

export const readLocalMessage = Base.NetBase.create({
    baseUrl: LOCAL,
    baseSuccess: (res: readLocalResponse) => {
        console.log(`通用响应处理: 请求成功`);
        console.log(`响应打印: %o`, res);
    }
})


/**
 * 读取本地存储 请求参数
 */
 export interface readLocalMessage extends NetParams{
    /**
     * 手机号
     */
    mobilecode?: string,
     /**
      * 资金账号
      */
    account?: string,
     /**
      * 客户号
      */
    userCode?: string,
     /**
      * 自选股列表
      */
    selfStockList?: string,
     /**
      * 用户手机号登录凭证
      */
    tztzttoken?: string,
     /**
      * 唯一编号
      */
    tztuniqueid?: string,
 }

 /**
 * 读取本地存储 返回参数
 */
export interface readLocalResponse{
    /**
     * 手机号
     */
     MOBILECODE?: string,
     /**
      * 资金账号
      */
      ACCOUNT?: string,
     /**
      * 客户号
      */
      USERCODE?: string,
     /**
      * 自选股列表
      */
      SELFSTOCKLIST?: string,
     /**
      * 用户手机号登录凭证
      */
      TZTZTTOKEN?: string,
     /**
      * 唯一编号
      */
      TZTUNIQUEID?: string,
}


/**
 *
 */
export interface AjaxEngineRequest extends NetParams{
    /**
     * 功能号
     */
    action: number;
}
export interface AjaxEngineResponse<T> {
    /**
     * request action
     */
    ACTION: string,
    /**
     * errorNo
     */
    ERRORNO: string,
    /**
     * error handle type enum(errorCustomer,errorDetail,alert,login,retry)
     */
    ERRORHANDLETYPE: string,
    /**
     * error info
     */
    ERRORHANDLEINFO: string,
    /**
     * error message
     */
    ERRORMESSAGE: string,
    DATA: T;
}

