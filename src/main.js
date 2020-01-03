import Vue from 'vue';
import App from './App.vue';
import router from './routers/index';
import store from './store/store';
import BaseComponent from './mixin/BaseComponent';
import fastclick from 'fastclick';
import MetaInfo from 'vue-meta-info';
import { webpack } from './config/config';
import './utils/adapter';
import './utils/inject';
import './pwa/registerServiceWorker';
import './components/global/index'; // 注册全局组件
// 去除移动端点击200ms延迟
fastclick.attach(document.body);
Vue.config.productionTip = false;
Vue.mixin(BaseComponent);
Vue.use(MetaInfo);
if (webpack.openSentry && process.env.NODE_ENV === 'production') {
  // 开启日志监控
  const Sentry = require('@sentry/browser');
  const Integrations = require('@sentry/integrations');
  Sentry.init({
    dsn: 'https://xxxx/xxxx', // 去sentry官网注册后即可得到
    integrations: [new Integrations.Vue({ Vue, attachProps: true })],
  });
}

const history = process.env.ROUTER_MODE === 'history';
new Vue({
  router,
  store,
  render: (h) => h(App),
  mounted() {
    webpack.spaPrerender.open && history && document.dispatchEvent(new Event('render-event')); // 用于spaPrerender
  },
}).$mount('#app');
