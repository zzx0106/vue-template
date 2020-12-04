module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  // 可选链操作
  plugins: [['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }]],
};
