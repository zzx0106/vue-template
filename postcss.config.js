module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-url': {},
        // 'postcss-aspect-ratio-mini': {}, //(这个可以不用)主要用来处理元素容器宽高比。在实际使用的时候，具有一个默认的结构
        'postcss-write-svg': {
            utf8: false,
        },
        autoprefixer: {},
        'postcss-flexbugs-fixes': {},
        'postcss-preset-env': {},
        // 新版本支持exclude
        'postcss-px-to-viewport': {
            viewportWidth: 750, // 设计稿宽度
            viewportHeight: 1334, // 设计稿高度，可以不指定
            unitPrecision: 3, // px to vw无法整除时，保留几位小数
            viewportUnit: 'vw', // 转换成vw单位
            selectorBlackList: ['::after', '::before'], // 不转换的类名 ['::after','::before'] 待验证 已有的after befor不会被覆盖
            minPixelValue: 1, // 小于1px不转换
            mediaQuery: false, // 允许媒体查询中转换
            exclude: /(\/|\\)(node_modules)(\/|\\)/, // 排除node_modules文件中第三方css文件
        },
        'postcss-pxtorem': {
            // 能够让插件被rem 而且已存在after before 里面的px也会被转化成rem 已存在的vh vw不会
            rootValue: 32,
            propList: ['*'],
        },
        'postcss-viewport-units': {
            // 修复after 和befor会报错的bug
            filterRule: (rule) => rule.selector.indexOf('::after') === -1 && rule.selector.indexOf('::before') === -1 && rule.selector.indexOf(':after') === -1 && rule.selector.indexOf(':before') === -1,
        },
        cssnano: {
            preset: 'advanced',
            autoprefixer: false, // 和cssnext同样具有autoprefixer，保留一个
            'postcss-zindex': false,
        },
    },
};
