import SuperRouter from '../utils/super-router';
import children from './children';
import permission from './middleware/permission';
import title from './middleware/title';
const load = (path) => {
  return () => import(/* webpackChunkName: "[request]" */ `@/pages${path}`);
};
const router = new SuperRouter({
  mode: process.env.ROUTER_MODE || 'hash', // 配置在'../config/config.js'
  routes: [
    {
      path: '/',
      name: 'home',
      component: load('/home'),
      children: [...children],
    },
    {
      path: '/other',
      name: 'other',
      component: load('/other'),
      meta: {
        title: '其他other',
      },
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});
router.interceptor(title);
router.interceptor(permission);
export default router;
