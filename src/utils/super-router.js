import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
class SuperRouter extends Router {
  constructor(options = RouterOptions) {
    super(options);
  }
  interceptor(callback = (to, from, next) => next()) {
    this.beforeEach((to, from, next) => {
      callback(to, from, next);
    });
  }
}
export default SuperRouter;
