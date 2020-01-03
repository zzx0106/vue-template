module.exports = {
  presets: [
    [
      '@vue/app',
      { useBuiltIns: 'usage' }, // 按需Polyfill https://cli.vuejs.org/zh/guide/browser-compatibility.html#browserslist
    ],
  ],
};
