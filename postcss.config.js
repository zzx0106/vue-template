module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-url'),
    require('postcss-write-svg')({
      utf8: false,
    }),
    require('autoprefixer'),
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env'),
    require('./src/lib/px2vw/index')({
      viewportWidth: 750, // 设计稿宽度
      viewportHeight: 1334, // 设计稿高度，可以不指定
      unitPrecision: 3, // px to vw无法整除时，保留几位小数
      viewportUnit: 'vw', // 转换成vw单位
      selectorBlackList: ['::after', '::before'], // 不转换的类名 ['::after','::before'] 待验证 已有的after befor不会被覆盖
      minPixelValue: 1, // 小于1px不转换
      mediaQuery: false, // 允许媒体查询中转换
      exclude: /(\/|\\)(node_modules)(\/|\\)/, // 排除node_modules文件中第三方css文件
    }),
    require('./src/lib/px2rem/index')({
      // 能够让插件被rem 而且已存在after before 里面的px也会被转化成rem 已存在的vh vw不会
      rootValue: 32,
      propList: ['*'],
      exclude: 'node_modules', // 可以使用|分隔符分隔
    }),
    require('postcss-viewport-units')({
      // 修复after 和befor会报错的bug
      filterRule: (rule) => {
        return (
          rule.selector.indexOf('::after') === -1 &&
          rule.selector.indexOf('::before') === -1 &&
          rule.selector.indexOf(':after') === -1 &&
          rule.selector.indexOf(':before') === -1
        );
      },
    }),
    require('cssnano')({
      cssnano: {
        preset: 'advanced',
        autoprefixer: false, // 和cssnext同样具有autoprefixer，保留一个
        'postcss-zindex': false,
      },
    }),
  ],
};
