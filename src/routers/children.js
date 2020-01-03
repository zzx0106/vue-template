const load = (path) => {
  return () => import(`@/pages${path}`);
};

const router = [
  {
    path: '/child',
    component: {
      render(c) {
        const { cache } = this.$route.meta;
        return c('div', [c('keep-alive', [cache && c('router-view')]), !cache && c('router-view')]);
      },
    },
    children: [
      {
        path: '/',
        name: '首页',
        component: load('/child/child'),
      },
      {
        path: '/permission',
        name: '权限页',
        component: load('/child/permission'),
      },
    ],
  },
];
export default router;
