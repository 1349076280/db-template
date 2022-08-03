import {NeDialogApi, DialogOptions} from "./types";
import mount from "../NeToast/helps/mount-components";
import {Dialog} from "./index";

const api = (globalOptions: DialogOptions = {}): NeDialogApi => {
    return {
        show( options: DialogOptions = {}) {
            const instanceOptions = { ...options}
            const target = mount(Dialog, {
                props: {...globalOptions, ...instanceOptions}
            })
            return target;
        }
    }
}
export default api;
