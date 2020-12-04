const path = require('path');
const join = path.join;
const fs = require('fs');
const os = require('os');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const Config = require('./src/config/config');
// const PrerenderSPAPlugin = require('prerender-spa-plugin');
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const isProduction = process.env.NODE_ENV === 'production';
// vue inspect > config.js 生成配置到config.js 查看配置
// 通过递归获取文件夹内所有文件路径
function findSync(startPath) {
  let result = [];
  function finder(path) {
    let files = fs.readdirSync(path);
    files.forEach((val) => {
      let fPath = join(path, val);
      let stats = fs.statSync(fPath);
      if (stats.isDirectory()) finder(fPath);
      if (stats.isFile()) {
        if (fPath.indexOf('.md') === -1) {
          result.push(fPath);
        }
      }
    });
  }
  finder(startPath);
  return result;
}
const fileNames = findSync('./src/assets/global'); // 拿到global里面的所有文件路径
const cssGlobal = fileNames.map((filename) => `@import "${filename}";`.replace(/\\/g, '/')).join('');

// cdn预加载使用
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  // Vconsole: 'vconsole',
};
const cdn = {
  // 生产环境
  build: {
    css: [],
    js: [
      'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
      'https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js',
      'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
      'https://cdn.bootcss.com/axios/0.19.0/axios.min.js',
      // 'https://cdn.bootcss.com/vConsole/3.2.0/vconsole.min.js',
    ],
  },
};
const prodConfigureWebpack = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: 2,
          reuseExistingChunk: true,
          enforce: true,
        },
        // vendor: {
        //     test(module) {
        //         let path = module.resource;
        //         if (!path) return true;
        //         path = path.replace(/\\/g, '/');
        //         let isNeed = path && /node_modules/.test(path) && /node_modules\/(?!muse)\n*/.test(path);
        //         // let isNeed = path && /node_modules/.test(path) && /node_modules\/(?!vuetify)/.test(path) && /node_modules\/(?!muse)\n*/.test(path);
        //         console.log('path', path, isNeed)
        //         if (!isNeed && path.indexOf('node_modules') > -1) {
        //             console.log('vendor not need::', path, isNeed);
        //         }
        //         return isNeed;
        //     },
        //     name: 'chunk-vendors',
        //     priority: 10,
        //     enforce: true,
        // },
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
    // 用户缓存，不会每次都修改打包的文件
    runtimeChunk: {
      name: (entrypoint) => `runtimechunk-${entrypoint.name}`,
    },
  },
};
module.exports = {
  lintOnSave: true, // true开启 false关闭eslint
  productionSourceMap: true, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProduction,
    // dev环境下开启sourceMap方便查找元素对应文件
    sourceMap: !isProduction,
    loaderOptions: {
      // 这里的选项会传递给对应-loader
      sass: {
        // 你可以在这里引入全局scss, 这样就不用每个页面都引入
        // 旧版本 sass-loader <= 7x
        // data: cssGlobal,
        // 新版本 sass-loader > 7x
        prependData: cssGlobal,
      },
    },
  },
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: ['swiper', 'dom7'],
  // 离线缓存 pwa应用
  // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {
    // api https://developers.google.cn/web/tools/workbox/
    workboxOptions: {
      importWorkboxFrom: 'local', // 本地server worker
      skipWaiting: true, // 跳过等待
      clientsClaim: true, // 立刻获取页面控制权
      exclude: [/\.map$/, /asset-manifest\.json$/],
      runtimeCaching: [].concat(Config.webpack.pwa.runtimeCaching),
    },
  },
  // parallel: os.cpus().length > 1, // 构建时开启多进程处理babel编译 已经默认开启
  configureWebpack: (config) => {
    config.mode = process.env.NODE_ENV; //指定webpack的编译环境
    // cheap-module-source-map 无法捕获错误位置，强压缩代码 prod
    // cheap-module-eval-source-map （默认）加快编译速度
    config.devtool = isProduction ? 'cheap-module-source-map' : 'cheap-module-eval-source-map';
    if (isProduction) {
      // 修改js压缩配置
      config.optimization.splitChunks = prodConfigureWebpack.optimization.splitChunks;
      config.optimization.runtimeChunk = prodConfigureWebpack.optimization.runtimeChunk;
      // externals里的模块不打包
      Object.assign(config, { externals: externals });
      // 移除console
      Object.assign(config.optimization.minimizer[0].options.terserOptions.compress, {
        warnings: false,
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
      });

      // gzip压缩
      config.plugins.push(
        // 还可以开启比 gzip 体验更好的 Zopfli 压缩详见https://webpack.js.org/plugins/compression-webpack-plugin
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|css|svg|woff|ttf|json|html|txt|ico)(\?.*)?$/i,
          threshold: 10240, // 大于10kb的会压缩
          deleteOriginalAssets: false, //压缩后删除原文件
          minRatio: 0.8,
        })
      );
    }
  },
  chainWebpack: (config) => {
    const webpackConfig = Config.webpack;
    // css有关的loader不建议在这里修改，在loaderOptions中修改即可
    if (webpackConfig.noPreload) {
      // 移除下面两个插件，防止首屏加载过多的请求
      // 移除 prefetch 插件
      config.plugins.delete('prefetch');
      // 移除 preload 插件
      config.plugins.delete('preload');
    }
    if (webpackConfig.pwa.off) {
      // 移除 pwa
      config.plugins.delete('pwa');
      config.plugins.delete('workbox');
    }
    // alins配置，
    // 可以通过.get(key)获取、.set(key, value)设置、.delete(key)
    // config.resolve.alias.get('@')
    if (webpackConfig.alias) {
      Object.keys(webpackConfig.alias).forEach((key) => {
        let value = webpackConfig.alias[key];
        value = path.resolve(__dirname, value.replace(/..\//, './src/'));
        config.resolve.alias.set(key, value);
      });
    }
    // 图片压缩(仅 production环境)
    // if (isProduction && webpackConfig.imgCompress) {
    //   config.module
    //     .rule('images')
    //     .use('image-webpack-loader')
    //     .loader('image-webpack-loader')
    //     .tap((options) => {
    //       options = options || {};
    //       options['mozjpeg'] = { progressive: true, quality: 75 };
    //       // optipng.enabled: false will disable optipng
    //       options['optipng'] = { enabled: false };
    //       options['gifsicle'] = { interlaced: true };
    //       options['pngquant'] = { quality: '75-90', speed: 4 };
    //       // win7貌似用不了下面的
    //       // the webp option will enable WEBP
    //       // options['webp'] = {
    //       //     quality: 75,
    //       // };
    //       return options;
    //     });
    // }
    // 修改全局配置
    if (webpackConfig.globalParams) {
      config.plugin('define').tap((args) => {
        Object.keys(webpackConfig.globalParams).forEach((key) => {
          let value = webpackConfig.globalParams[key];
          if (value) args[0]['process.env'][`${key}`] = JSON.stringify(value);
        });
        return args;
      });
    }
    // 非history模式下这个预渲染功能无效
    // if (isProduction && webpackConfig.globalParams.ROUTER_MODE === 'history' && webpackConfig.spaPrerender.open) {
    //   config.plugin('prerender').use(PrerenderSPAPlugin, [
    //     {
    //       // 生成文件的路径，也可以与webpakc打包的一致。
    //       // 下面这句话非常重要！！！
    //       // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
    //       staticDir: path.join(__dirname, 'dist'),
    //       // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
    //       routes: webpackConfig.spaPrerender.routes,
    //       // 这个很重要，如果没有配置这段，也不会进行预编译
    //       renderer: new Renderer({
    //         inject: {
    //           foo: 'bar',
    //         },
    //         //其他操纵up选项。
    //         //（请参阅此处：https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions）
    //         headless: false, //渲染时显示浏览器窗口。对于调试很有用。
    //         // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
    //         renderAfterDocumentEvent: 'render-event',
    //       }),
    //     },
    //   ]);
    // }

    config.plugin('html').tap((args) => {
      // 注 pubilc中的index.html页面中需要做对应参数的填充
      if (isProduction) args[0].cdn = cdn.build;
      args[0].inject = true;
      return args;
    });
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080, // 端口号
    open: false, //配置自动启动浏览器
    overlay: {
      // 输出到屏幕上，错误
      warnings: true,
      errors: true,
    },
    // proxy: {
    // '/api': {
    //   target: 'http://xxxx:41200', // 服务器
    //   changeOrigin: true,
    // },
    // },
  },
};
