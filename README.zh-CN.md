# 安装

使用 `git clone ...` 拉取代码

拉取代码后，在项目根目录执行`npm install`，成功后执行`npm run dev`即可启动项目（需安装nodejs+npm）

# 内置模块
* NetBase([Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch))
* Cookie
* Storage
* [vue-router](https://next.router.vuejs.org/zh/)
* [vuex](https://next.vuex.vuejs.org/zh/)

# 注意事项
* 本框架采用 [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch) 作为网络请求器，不建议再次引入 axios
* 请不要在业务项目中修改 `lib` 文件夹下面的所有文件
* 建议自定义根库继承自 `lib/ts/Base`
* [gitee](https://gitee.com/phcs/vite-ts-quick) 仅用于国内用户拉取代码，从 [github](https://github.com/pohunchn/vite-ts-quick) 同步，如需 `pr` 请访问 [github](https://github.com/pohunchn/vite-ts-quick)
* **欢迎 `issues` 及 `pr`**
* **欢迎 `star`**

# 已完成内容
* 页面框架
* 接口请求
* store
* router
* 获取用户信息保存到store,中焯的API无感 魏战强
* 中焯跳转 导出几个方法 李佳楠
* 神策埋点 金伟斌
* 组件定义
* 打包后目录名修改
* 类型约束
* 路由标题设置


# 待办事项
* 开发发布流程

# 以下为 vue3 教学

## Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite.

#### 如果使用 `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:

#### If Using Volar

Run `Volar: Switch TS Plugin on/off` from VSCode command palette.

#### If Using Vetur

1. Install and add `@vuedx/typescript-plugin-vue` to the [plugins section](https://www.typescriptlang.org/tsconfig#plugins) in `tsconfig.json`
2. Delete `src/shims-vue.d.ts` as it is no longer needed to provide module info to Typescript
3. Open `src/main.ts` in VSCode
4. Open the VSCode command palette 5. Search and run "Select TypeScript version" -> "Use workspace version"


