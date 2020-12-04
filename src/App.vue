<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="isRouterAlive && $route.meta.cache"></router-view>
    </keep-alive>
    <router-view v-if="isRouterAlive && !$route.meta.cache"></router-view>
  </div>
</template>
<script>
export default {
  provide() {
    return {
      reload: this.reload,
      canScroll: this.canScroll,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    canScroll(can = true) {
      document.body.style.overflow = !!can ? 'visible' : 'hidden';
      // pc端
      // const paddingRight = getBrowser() === 'chrome' ? '10px' : '17px';
      // document.body.style.paddingRight = !!can ? '0px' : paddingRight;
      // document.querySelector('.my-header').style.width = !!can ? '100%' : `calc(100% - ${paddingRight})`;
    },
  },
};
</script>
<style lang="scss">
@import './assets/reset.scss';
</style>
