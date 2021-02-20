import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
// 获取原始push函数
const originalPush = Router.prototype.push;
// 修改push方法
Router.prototype.push = function (location) {
  return originalPush.call(this, location).catch((err) => {
    if (err.message.includes('Avoided redundant navigation to current location')) {
      console.warn('重复点击路由');
    } else {
      console.error(err);
    }
  });
};
class SuperRouter extends Router {
  constructor(options = RouterOptions) {
    super(options);
  }
  interceptor(callback = (to, from, next) => next()) {
    this.beforeEach((to, from, next) => {
      callback(to, from, next, this);
    });
  }
}
export default SuperRouter;
