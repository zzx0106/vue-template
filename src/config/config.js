const cache = require('../pwa/runtimeCaching');
const CONFIG = {
  webpack: {
    pwa: {
      off: true, // 是否关闭pwa
      runtimeCaching: [].concat(cache), // 缓存文件类型
    },
    openSentry: false, // 是否开启sentry
    // 是否开启spa预渲染功能
    // 注：包大小140m左右，只能用于history模式，只能用于顶层路由
    spaPrerender: {
      open: false, // 是否开启预渲染
      // 需要预渲染的路由列表（路由路径），一般只能用顶层路由，子路由不会渲染
      routes: ['/', '/other'],
    },
    imgCompress: false, // 图片压缩
    noPreload: true, // 关闭预加载，减少页面请求
    alias: {
      // 已存在 '@' => src
      // 该对象只允许存放src内部的文件，../会被替换为src
    },
    // 全局参数，会被作用至全局
    globalParams: {
      // 通过 process.env.VERSION 获得
      // 已存在 BASE_URL => /
      // 已存在 NODE_ENV => "production" || "development"
      VERSION: '1.0.0',
      API_BASEURL: 'https://api', // 公共接口
      ROUTER_MODE: 'hash',
      OTHER_PARAMS: 'other',
    },
  },
};
module.exports = CONFIG;
