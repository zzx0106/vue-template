// 动态加载全局组件
import Vue from 'vue';
const componentsContext = require.context('./', true, /\.vue$/);
componentsContext.keys().forEach((component) => {
  try {
    console.log('component', component);
    const componentConfig = componentsContext(component);
    const [target, $1] = /([^\/]*)\.vue/g.exec(component) || [];
    if (!$1) return console.warn(`${component}组件不符合规范，无法注册全局`);
    /**
     * 兼容 import export 和 require module.export 两种规范
     * c,t,r,l
     */
    const ctrl = componentConfig.default || componentConfig;
    Vue.component(ctrl.name || $1, ctrl);
  } catch (error) {
    console.warn('全局组件注册报错', error);
  }
});
