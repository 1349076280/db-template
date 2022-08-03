import { Module } from "vuex";

interface ClientInfo {
    /**
     * 应用版本号
     */
    softVersion: string,
}

const store: Module<ClientInfo, unknown> = {
    namespaced: true,
    state() {
        return {
            softVersion: ""
        }
    },
    mutations: {
        setClientInfo(state: ClientInfo, payload: AnyObject) {
            state.softVersion = payload.softVersion;
        }
    },
    actions: {
        readClientInfo(context, payload: AnyObject) {
            context.commit("setText", payload);
        }
    },
    getters: {
        getClientInfo(state: ClientInfo) {
            return state
        }
    }
}

export default store
