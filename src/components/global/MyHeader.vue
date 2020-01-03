<template>
  <div class="my-header" :style="{color, background}">
    <div class="header-left" @click="back">
      <!-- <img v-if="backColor === 'black'" src="../../assets/images/nav_icon_back.png">
      <img v-else src="../../assets/images/nav_icon_white.png"> -->
    </div>
    <div class="header-center">{{title}}</div>
    <div class="header-right" @click="$emit('myClick')">{{subtitle}}</div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      defalut: '',
    },
    subtitle: {
      type: String,
      defalut: '',
    },
    backColor: {
      type: String,
      default: 'black',
    },
    background: {
      type: String,
      default: '#f5f5f5',
    },
    color: {
      type: String,
      default: '#000',
    },
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
.my-header {
  height: 88px;
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 24px;
  justify-content: space-between;
  .header-left,
  .header-right {
    display: flex;
    align-items: center;
    flex: 1;
    height: 88px;
    line-height: 88px;
  }
  .header-center {
    flex: 2;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
  }
  .header-right {
    color: #333333;
    font-size: 28px;
    text-align: right;
    display: inline-block;
  }
  .header-left {
    img {
      width: 44px;
      height: 44px;
    }
  }
}
</style>