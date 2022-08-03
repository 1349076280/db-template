<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
@import "../../styles/variables";
@import "../../styles/mixins";
.container {
  padding: 0 rem(30);
  color: #333333;
  background: #FFFFFF;
  height: 100vh;
}
</style>
