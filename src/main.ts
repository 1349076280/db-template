import '@babel/polyfill';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from "./store";

import { ToastPlugin } from './components/NeToast';
import { DialogPlugin } from './components/NeDialog';

import "./assets/css/setting.css"
import "./assets/css/global.css"

import {init} from "./sensors";

// 神策初始化
init();
// 获取用户信息
store.dispatch('user/readUserInfo')

const app = createApp(App);

app.use(router);
app.use(store);
app.use(ToastPlugin);
app.use(DialogPlugin);


// add eruda to test env
if (!import.meta.env.PROD) {
    const script = window.document.createElement('script');
    script.src = '//cdn.jsdelivr.net/npm/eruda';
    window.document.body.append(script);
    const timer = window.setInterval(() => {
        if (window.eruda) {
            window.eruda.init();
            window.clearInterval(timer);
        }
    }, 1000);
}


app.mount('#app')
export default app;
