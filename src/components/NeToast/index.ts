import {App, Plugin} from 'vue';
import Toast from './components/Toast.vue';
import {namespace} from "../utils";
import {ToastOptions} from "./types";
import createToaster from './api'

export const ToastPlugin: Plugin = {
    install(app: App, options: ToastOptions = {}) {
        let toastApi = createToaster(options);
        window.Toast = toastApi;
        app.component(namespace('toast'), Toast);
    },
};

Toast.install = ToastPlugin;

export {Toast};
