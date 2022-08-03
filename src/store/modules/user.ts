import { Module } from "vuex";
import {readLocalMessage,readLocalResponse} from "../../api/Index";


interface StoreUser {
    /**
     * 手机号
     */
    mobile: string,
    /**
     * 资金账号
     */
    fundAccount: string,
    /**
     * 客户号
     */
    userCode: string,
    /**
     * 自选股列表
     */
    selfStockList: string[],
    /**
     * 用户手机号登录凭证
     */
    userToken: string,
    /**
     * 唯一编号
     */
    uniqueId: string,

}

interface userInfoRequest extends readLocalMessage {
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

const store: Module<StoreUser, unknown> = {
    namespaced: true,
    state() {
        return {
            mobile: "",
            fundAccount: "",
            userCode: "",
            selfStockList: [],
            userToken: "",
            uniqueId: "",

        }
    },
    mutations: {
        setUser(state: StoreUser, payload: AnyObject) {
            state.mobile = payload.MOBILECODE;
            state.fundAccount = payload.ACCOUNT;
            state.userCode = payload.USERCODE;
            state.selfStockList = payload.SELFSTOCKLIST;
            state.userToken = payload.TZTZTTOKEN;
            state.uniqueId = payload.TZTUNIQUEID;
        },
        clearUser(state: StoreUser) {
            state.mobile = "";
            state.fundAccount = "";
            state.userCode = "";
            state.selfStockList = [];
            state.userToken = "";
            state.uniqueId = "";
        },
    },
    actions: {
        async readUserInfo(context) {
            const request:userInfoRequest = {
                mobilecode: '',
                account: '',
                userCode: '',
                selfStockList: '',
                tztzttoken: '',
                tztuniqueid: '',
            }
            const payload: readLocalResponse = await readLocalMessage.post<readLocalResponse>('',request)
            context.commit("setUser", payload)
        },
        delUserInfo (context) {
            // 唤起手机号登录 http://action:10314/ 清楚数据
            
            context.commit("clearUser")
        }
    },
    getters: {
        getUserInfo(state: StoreUser) {
            return state
        }
    }
}

export default store
