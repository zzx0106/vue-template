# vue 模板

### 该模板为参考模板，内容比较多，不建议直接用于正式环境，按需求摘取符合自己项目所需要的功能

vue 全家桶、pwa、预渲染+SEO 优化、sentry 错误监控、vw vh 移动端适配+兼容、权限、webpack 优化

```
安装依赖
npm i

运行
npm run dev

打包
npm run build

检查打包日志
npm run build:report

输出webpack配置
npm run config


```

#### 使用脚手架生成默认模板结构
```
vue create hello-world
? Please pick a preset: (Use arrow keys)
> Manually select features 使用自定义模式

? Check the features needed for your project:
  (*) Babel
  ( ) TypeScript vue2x版本暂时不考虑，当3x版本再切换
  (*) Progressive Web App (PWA) Support 这个项目中涵盖
  (*) Router
  (*) Vuex
  (*) CSS Pre-processors
  (*) Linter / Formatter
  (*) Unit Testing  这个可选可不选 
  (*) E2E Testing   这个可选可不选

? Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n) n

? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): (Use arrow keys)
> Sass/SCSS

? Pick a linter / formatter config:
> ESLint with error prevention only

? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)
>(*) Lint on save

? Pick a unit testing solution:
> Jest

? Pick a E2E testing solution: (Use arrow keys)
> Cypress (Chrome only)

? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? (Use arrow keys)
> In dedicated config files

? Save this as a preset for future projects? (y/N) y

后面一个是选择你保存的模板名字
```

#### 使用到的插件
```
------ postcss 全套 ------
npm i postcss-flexbugs-fixes postcss-import postcss-preset-env postcss-px-to-viewport postcss-pxtorem postcss-url postcss-viewport-units postcss-write-svg cssnano cssnano-preset-advanced -D

** 介绍在postcss.config.js中
```
```
------ 其他插件 -------
npm i axios fastclick vuex vue-router -S
```
```
------ 预渲染套餐 ------
npm i vue-meta-info prerender-spa-plugin -S

** 注意 prerender-spa-plugin 会下载一个145m的包，不过速度很快十秒左右。可酌情选择
** 用于页面预渲染，单页应用seo操作
```
```
------- 打包优化 ------
npm i compression-webpack-plugin -D

** gzip压缩，减少nginx服务器压力
```
```
------- 图片压缩 ------
npm i image-webpack-loader -D

** 通过系统的压缩工具对图片进行压缩，让图片失帧率变低
```
```
------ 错误监控平台 ------
建议使用chrome浏览器打开，其他的也能打开
https://sentry.io/welcome/
用github登录
创建项目
选择Browser(vue不在Popular之列...) 选择vue
然后会让你下载依赖

npm install @sentry/browser @sentry/integrations -S

```


TODO

docker 自动化部署

jest 单元测试
