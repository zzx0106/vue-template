/**
 * 路由拦截器
 */
function title(to, from, next) {
  if (to.meta.title) {
    document.title = to.meta.title || to.name;
  }
  next();
}

export default title;
