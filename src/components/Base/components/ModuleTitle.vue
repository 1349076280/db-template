<template>
  <div class="module-title">
    <div class="module-title__title">
      <slot name="title"></slot>
      <slot>{{title}}</slot>
    </div>
    <div class="module-title__attr" @click="_click">
      <slot name="value"></slot>
      <slot>{{value}}</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, withDefaults} from "vue";

interface ModuleTitleProps {
  // 标题
  title: string;
  // 右侧文本
  value?: string;
}

// 提供给外部的参数
const props = withDefaults(defineProps<ModuleTitleProps>(), {});
const emit = defineEmits(["attrClick"]);
const _click = () => {
  emit("attrClick");
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";
@import "../../styles/mixins";
.module-title {
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin: rem(20) 0;
  &__title {
    height: rem(38);
    font-family: PingFangSC-Medium;
    font-size: rem(38);
    color: #333333;
    line-height: rem(38);
    font-weight: 500;
  }
  &__attr {
    font-family: PingFangSC-Regular;
    font-size: rem(26);
    color: #A6A6A6;
    letter-spacing: 0;
    text-align: right;
    font-weight: 400;
  }
}
</style>
