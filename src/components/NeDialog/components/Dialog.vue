<template>
  <div ref="el" class="c-dialog showAnimation">
    <div v-if="mask" class="mask"></div>
    <div class="dialog">
      <div :class="['dialogCont', `c-dialog--${mask}`]" :style="`width:${width}%`">
        <h1>{{ title }}</h1>
        <div class="dialogCenter"   :style="`text-align:${messageAlign}`"  v-html="lineMsg">

        </div>
        <div class="dialogBottom">
          <div @click="closeDialog(false)" v-if="showCancelButton" class="btn"  :style="`color:${cancelButtonColor}`">
            {{ cancelButtonText }}
          </div>
          <div v-if="showCancelButton && showConfirmButton" class="line"></div>
          <div @click="closeDialog(true)" v-if="showConfirmButton" class="btn" :style="`color:${confirmButtonColor}`">
            {{ confirmButtonText }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  ref,
  defineProps,
  withDefaults,
  onBeforeMount,
  getCurrentInstance,
  computed,
  onMounted,
} from "vue";
import { definePosition } from "../defaults/position";
interface DialogProps {
  type: string;
  title?: string;
  message?: string;
  messageAlign?: string;
  width?: number | string;
  mask?: boolean;
  showConfirmButton?: boolean;
  confirmButtonColor?: string;
  confirmButtonText?: string;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  cancelButtonColor?: string;
  onClose?: Function;
  onClick?: Function;
}

// 提供给外部的参数
const props = withDefaults(defineProps<DialogProps>(), {
  type: "default",
  title: "标题",
  message:
    "说明当前状态，信息和解决方案",
  messageAlign:'left',
  width: "90%",
  mask: true,
  showConfirmButton: true,
  confirmButtonColor: "#2F86F6",
  confirmButtonText: "确认",
  showCancelButton: true,
  cancelButtonText: "取消",
  cancelButtonColor: "#2F86F6",
  onClose: () => {
    console.log("关闭了");
  },
  onClick: () => {
    console.log("打开了");
  },
});
const lineMsg = computed(() => {
  let msg=props.message
    if(msg.indexOf('/n')){
      msg= msg.replaceAll('/n','<br/>')
    }
    if(msg.indexOf('\n')){
      msg= msg.replaceAll('\n','<br/>')
    }
    return msg
})

function closeDialog(btnType:boolean){
  document.querySelector(".c-dialog")?.remove();
  // console.log('点击的数值=',props)
   if(btnType){
      props.onClick()
   }else{
      props.onClose()
     
   }
}

// 是否展示
const isShow = ref(false);
// 默认主题
const useDefaultCss = ref(true);

let parentCenter = ref(HTMLElement);

// 展示
function showNotice() {
  const proxy = getCurrentInstance();
  definePosition(parentCenter).insertAdjacentElement(
    "afterbegin",
    proxy?.refs.el
  );
}
// 创建父组件
function createParents() {
  parentCenter = document.querySelector(".c-dialog-container--center");

  if (parentCenter) return;

  if (!parentCenter) {
    parentCenter = document.createElement("div");
    parentCenter.className = "c-dialog-container c-dialog-container--center";
  }
}
// 默认样式设置
function setDefaultCss() {
  const type = useDefaultCss ? "add" : "remove";
  parentCenter.classList[type]("v--default-css");
}
// 将组件拼装进去
function setupContainer() {
  const container = document.body;
  container.appendChild(parentCenter);
}

onBeforeMount(() => {
  createParents();
  setDefaultCss();
  setupContainer();
});
onMounted(() => {
  showNotice();
});
</script>

<style lang="scss">
@import "../themes/defaults/index.scss";

</style>
