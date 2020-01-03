import store from '../../store/store';
/**
 * 路由拦截器
 */
function permission(to, from, next) {
  console.log('store.getters["test/get_isLogin"]', store.getters['test/get_isLogin']);
  if (to.path === '/permission') {
    if (store.getters['test/get_isLogin']) {
      next();
    } else {
      alert('权限页面需要登陆， 此时可以跳转登陆页');
      console.log('权限页需要登陆');
      next('/child');
    }
  } else {
    next();
  }
}

export default permission;
