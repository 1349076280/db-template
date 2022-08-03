import {NeToastApi, ToastOptions} from "./types";
import mount from "./helps/mount-components";
import {Toast} from "./index";


const api = (globalOptions: ToastOptions = {}): NeToastApi => {
    return {
        show(message: string, options: ToastOptions = {}) {
            const instanceOptions = {message, ...options}
            const target = mount(Toast, {
                props: {...globalOptions, ...instanceOptions}
            })
            return target;
        }
    }
}
export default api;
