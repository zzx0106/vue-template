// 可用于统一处理组件
const CacheComponent = {
  beforeRouteEnter(to, form, next) {
    next((vm) => {
      if (!form.fullPath.includes('/protocols')) {
        if (vm.refresh) {
          // 处理date-time-picker的缓存问题
          vm.refresh = false;
          vm.$nextTick(() => {
            vm.refresh = true;
          });
        }
      }
    });
  },
  beforeRouteLeave: function (to, form, next) {
    console.log('beforeRouteLeave', this);
    if (!to.fullPath.includes('/protocols')) {
      console.log('清除缓存', this, this.$data, this.leavePage);
      Object.assign(this.$data, this.$options.data.call(this));
      this.leavePage && this.leavePage();
    }
    next();
    // next((vm) => {
    //   console.log('--------asdfasdfafas', vm, !to.fullPath.includes('/protocols'));
    //   if (!to.fullPath.includes('/protocols')) {
    //     console.log('清除缓存', vm.created);
    //     Object.assign(vm.$data, vm.$options.data.call(vm));
    //     vm.leavePage && vm.leavePage();
    //   }
    // });
  },
  // async activated() {
  //   try {
  //     // 如果从home跳入 重新刷新当前页面数据
  //     if (this.$route.meta.back) {
  //       console.log('从home进入，从新刷新页面数据.....');
  //       Object.assign(this.$data, this.$options.data.call(this));
  //       return;
  //     }
  //   } catch (error) {
  //     console.error('activated 数据更新失败', error);
  //   }
  // },
};
export default CacheComponent;
