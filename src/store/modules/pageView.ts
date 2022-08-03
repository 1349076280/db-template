import { Module } from "vuex";

interface PageViewInfo {
    /**
     * 浏览页面的开始时间
     */
    startViewTime: number,
    /**
     * 页面来源
     */
    pageFrom: string,
}

const store: Module<PageViewInfo, unknown> = {
    namespaced: true,
    state() {
        return {
            startViewTime: (new Date()).getTime(),
            pageFrom: "",
        }
    },
    mutations: {
        setPageFrom(state: PageViewInfo, payload: string) {
            state.pageFrom = payload
        },
        setPageStartTime(state: PageViewInfo, payload: number) {
            state.startViewTime = payload
        }
    },
    actions: {
    },
    getters: {
        getPageViewInfo(state: PageViewInfo) {
            return state
        },
    }
}

export default store
