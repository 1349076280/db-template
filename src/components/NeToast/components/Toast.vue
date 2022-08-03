<template>
<transition>
    <div ref="el" :class="['c-toast', `c-toast--${type}`, `c-toast--${position}`]"
         @click="() => onClick" v-html="message"></div>
</transition>
</template>
<script lang="ts" setup>
import POSITIONS from "../defaults/position";
import {ref, defineProps, withDefaults, onBeforeMount, getCurrentInstance, onMounted} from "vue";
import {definePosition} from "../defaults/position";
interface ToastProps {
  message: string
  type?: string
  position?: string
  onClose?: Function
  onClick?: Function
  duration: number
}

// 提供给外部的参数
const props = withDefaults(defineProps<ToastProps>(), {
  type: 'default',
  position: POSITIONS.BOTTOM_RIGHT,
  onClose: () => {},
  onClick: () => {},
  duration: 2000
})

// 是否展示
const isShow = ref(false);
// 默认主题
const useDefaultCss = ref(false);

let parentTop: HTMLElement | null = null;
let parentBottom: HTMLElement | null = null;
let el = ref<HTMLElement | null>(null)

// 展示
function showNotice() {
  const proxy = getCurrentInstance();
  definePosition(props.position, parentTop, parentBottom).insertAdjacentElement('afterbegin', proxy?.refs.el);
}
// 创建父组件
function createParents() {
  parentTop = document.querySelector('.c-toast-container--top')
  parentBottom = document.querySelector('.c-toast-container--bottom')

  if (parentTop && parentBottom) return

  if (!parentTop) {
    parentTop = document.createElement('div')
    parentTop.className = 'c-toast-container c-toast-container--top'
  }

  if (!parentBottom) {
    parentBottom = document.createElement('div')
    parentBottom.className =
        'c-toast-container c-toast-container--bottom'
  }
}
// 默认样式设置
function setDefaultCss() {
  const type = useDefaultCss ? 'add' : 'remove'
  parentTop?.classList[type]('v--default-css')
  parentBottom?.classList[type]('v--default-css')
}
// 将组件拼装进去
function setupContainer() {
  const container = document.body
  parentTop && container.appendChild(parentTop)
  parentBottom && container.appendChild(parentBottom)
}

onBeforeMount(() => {
  createParents();
  setDefaultCss();
  setupContainer();
});
onMounted(() => {
  showNotice();
  let timer = setTimeout(() => {
    if (el.value ) {
        el.value.style.opacity = '0';
        clearTimeout(timer);
        let time = setTimeout(() => {
            if (el.value ) {
              el.value.style.display = 'none';
              clearTimeout(time);
            }
        }, 400)
    }
  }, 400)

})
</script>

<style lang="scss">
@import '../themes/defaults/index.scss';
.v--default-css {
  @import '../themes/defaults/colors.scss';
  @import '../themes/defaults/toast.scss';
}
</style>
