import {render, h, Component} from 'vue'
import {DefineComponent, VNode} from "@vue/runtime-core";

const createElement = () =>
    typeof document !== 'undefined' && document.createElement('div')

const mount = (component: Component, { props, children, element, app }: any  = {}) => {
    let el = element ? element : createElement()
    console.log(el);

    let vNode = h(component, props, children)
    if (app && app._context) {
        vNode.appContext = app._context
    }

    render(vNode, el)

    const destroy = () => {
        if (el) {
            render(null, el)
        }
        el = null
        // @ts-ignore
        vNode = null
    }

    return { vNode, destroy, el }
}

export default mount
