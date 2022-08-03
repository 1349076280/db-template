import {App, Plugin} from 'vue';
import Dialog from './components/Dialog.vue';
import {namespace} from "../utils";
import {DialogOptions} from "./types";
import createDialog from './api'
export const DialogPlugin: Plugin = {
    install(app: App, options: DialogOptions = {}) {
        const dialogAPI = createDialog(options);
        window.Dialog = dialogAPI;
        app.component(namespace('Dialog'), Dialog);
    },
};

Dialog.install = DialogPlugin;

export {Dialog};
