{ templateParameters: [Function: templateParameters],
  template: 'D:\\work\\project\\self\\vue-template\\public\\index.html',
  cdn:
   { css: [ '' ],
     js:
      [ 'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
        'https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js',
        'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
        'https://cdn.bootcss.com/axios/0.19.0/axios.min.js' ] },
  inject: true }
{
  mode: 'development',
  context: 'D:\\work\\project\\self\\vue-template',
  devtool: 'cheap-module-eval-source-map',
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: 'D:\\work\\project\\self\\vue-template\\dist',
    filename: '[name].js',
    publicPath: '/',
    globalObject: '(typeof self !== \'undefined\' ? self : this)'
  },
  resolve: {
    alias: {
      '@': 'D:\\work\\project\\self\\vue-template\\src',
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      'D:\\work\\project\\self\\vue-template\\node_modules',
      'D:\\work\\project\\self\\vue-template\\node_modules\\_@vue_cli-service@3.11.0@@vue\\cli-service\\node_modules'
    ]
  },
  resolveLoader: {
    modules: [
      'D:\\work\\project\\self\\vue-template\\node_modules\\_@vue_cli-plugin-eslint@3.11.0@@vue\\cli-plugin-eslint\\node_modules',
      'D:\\work\\project\\self\\vue-template\\node_modules\\_@vue_cli-plugin-babel@3.11.0@@vue\\cli-plugin-babel\\node_modules',
      'node_modules',
      'D:\\work\\project\\self\\vue-template\\node_modules',
      'D:\\work\\project\\self\\vue-template\\node_modules\\_@vue_cli-service@3.11.0@@vue\\cli-service\\node_modules'
    ]
  },
  module: {},
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"',
          BASE_URL: '"/"'
        },
        'process.env.VERSION': '"1.0.0"'
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('extract-css') */
    new MiniCssExtractPlugin(
      {
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css'
      }
    ),
    /* config.plugin('hmr') */
    new HotModuleReplacementPlugin(),
    /* config.plugin('progress') */
    new ProgressPlugin(),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        templateParameters: function () { /* omitted long function */ },
        template: 'D:\\work\\project\\self\\vue-template\\public\\index.html',
        cdn: {
          css: [
            ''
          ],
          js: [
            'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
            'https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js',
            'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
            'https://cdn.bootcss.com/axios/0.19.0/axios.min.js'
          ]
        },
        inject: true
      }
    ),
    /* config.plugin('pwa') */
    new HtmlPwaPlugin(
      {
        name: 'vue-template'
      }
    ),
    /* config.plugin('copy') */
    new CopyWebpackPlugin(
      [
        {
          from: 'D:\\work\\project\\self\\vue-template\\public',
          to: 'D:\\work\\project\\self\\vue-template\\dist',
          toType: 'dir',
          ignore: [
            '.DS_Store'
          ]
        }
      ]
    )
  ],
  entry: {
    app: [
      './src/main.js'
    ]
  }
}
