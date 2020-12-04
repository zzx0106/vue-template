<template>
  <div class="my-footer-box"></div>
</template>
<script>
export default {
  name: 'my-footer-box', // name显示组件名，可以方便搜索
  props: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.my-footer-box {
  width: 100%;
  height: 112px;
  box-shadow: 0px -2px 20px rgba(0, 0, 0, 0.08);
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  padding-bottom: env(safe-area-inset-bottom);
  padding-top: constant(safe-area-inset-top);
  display: flex;
  align-items: center;
}
</style>
