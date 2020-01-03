/**
 * 因为某些情况下，页面跳转会导致jssdk的原始功能调用失败
 * 故每次跳转页面都加载一下jssdk
 */
async function jssdk(to, from, next) {
  // 当前页面是否需要使用微信的功能
  if (to.meta.wx) {
    await getJSSDK();
  }
  next();
}
async function getJSSDK() {
  try {
    let config = await api_getWXConfig(); // ，模拟接口请求
    wx &&
      wx.config({
        debug: false,
        ...config,

        jsApiList: ['scanQRCode' /* other function */],
      });
  } catch (error) {
    console.error('获取wx配置失败', error);
  }
}
function api_getWXConfig() {
  return Promise.resolve({
    appId: 'appId',
    timestamp: 'timestamp',
    nonceStr: 'nonceStr',
    signature: 'signature',
  });
}
export default jssdk;
