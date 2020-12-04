// import { api_getWXConfig } from '../../api/api';
import { lazyImageLoad } from '../../utils/tools';
import wx from 'weixin-js-sdk';
/**
 * 因为某些情况下，页面跳转会导致jssdk的原始功能调用失败
 * 故每次跳转页面都加载一下jssdk
 */
let publicing = false; // 是否在使用默认的
async function jssdk(to, from, next) {
  const shareLink = `${location.origin}/#${to.fullPath}`;
  console.log('shareLink', shareLink);
  // 当前页面是否需要使用微信的功能
  if (to.meta.share) {
    publicing = false;
    to.meta.share.link = shareLink;
    getJSSDK(to.meta.share);
    // to.meta.share.link = location.href;
    // wx.updateAppMessageShareData(to.meta.share);
  } else {
    // 如果不是自定义的分享
    if (!to.meta.customShare) {
      publicing = true;
      getJSSDK({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: shareLink,
        imgUrl: '', // 分享图标
        success: function () {
          console.log(`%c 页面分享成功`, 'background:#E457FD;color:#fff');
        },
      });
    }
  }
  next();
}

export async function getJSSDK(share) {
  try {
    let config = await api_getWXConfig({
      url: location.href.split('#')[0], // 调用后端，只需要前面那么一截即可
    });
    console.log('wx-config', config, '是否存在wx对象', 'wx' in window, window['wx']);
    wx.config({
      debug: false,
      appId: config.appId, // 必填，公众号的唯一标识
      timestamp: config.timestamp, // 必填，生成签名的时间戳
      nonceStr: config.nonceStr, // 必填，生成签名的随机串
      signature: config.signature, // 必填，签名
      jsApiList: [
        'updateAppMessageShareData',
        'updateTimelineShareData',
        'onMenuShareAppMessage', // 旧版分享 加上是为了避免qq分享失效
        'onMenuShareTimeline', // 旧版朋友圈 加上是为了避免qq分享失效
      ],
    });
    wx.ready(function (e) {
      console.log('wx.ready---》', e);
      console.log('share.link', share.link);
      wx.updateTimelineShareData({
        title: share.title,
        link: share.link,
        imgUrl: share.imgUrl, // 分享图标
        success: function () {
          console.log(`%c ${share.title}朋友圈设置成功`, 'background:#E457FD;color:#fff');
        },
      });
      wx.updateAppMessageShareData(share);
    });
    wx.error(function (error) {
      console.error('wx.error---》', error);
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
