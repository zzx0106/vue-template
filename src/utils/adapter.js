// // vw vh适配方案，会将vw，vh转为对应px
import viewportUnitsBuggyfill from '../lib/viewport-units-buggyfill/index';
import hacks from '../lib/viewport-units-buggyfill/hacks';
// import FastClick from 'fastclick';
import { isIOS } from './tools';

viewportUnitsBuggyfill.init({
  hacks,
});
/**
 * @desc 可用于适配px->vw不兼容的情况，比如ui框架或者after、befor里面的内容
 * @desc 设置根据界面宽度375比16px进行响应式适配。postcss-pxtorem 设置"selectorBlackList":[".ignore",".hairlines","van"],忽略框架代码
 */
const baseSize = 32;
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 750;
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px';
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem();
};

// FastClick.attach(document.body);
// // 解决FastClick导致的点击困难问题
// FastClick.prototype.focus = function(targetElement) {
//   let length;
//   let u = navigator.userAgent;
//   let deviceIsIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//   if (
//     deviceIsIOS &&
//     targetElement.setSelectionRange &&
//     targetElement.type.indexOf('date') !== 0 &&
//     targetElement.type !== 'time' &&
//     targetElement.type !== 'month'
//   ) {
//     length = targetElement.value.length;
//     targetElement.focus();
//     targetElement.setSelectionRange(length, length);
//   } else {
//     targetElement.focus();
//   }
// };
window.addEventListener(
  'touchstart',
  function (e) {
    if (e.targetTouches.length === 2) {
      e.preventDefault();
    }
  },
  { passive: false }
);
if (/Android/gi.test(navigator.userAgent)) {
  window.addEventListener('resize', function () {
    const activeEl = document.activeElement;
    if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
      // 最次级方案，有bug，针对小米
      // let top = document.activeElement.getBoundingClientRect().top;
      // window.scrollTo(0, top);
      window.setTimeout(function () {
        if ('scrollIntoViewIfNeeded' in activeEl) {
          activeEl.scrollIntoViewIfNeeded();
        } else {
          activeEl.scrollIntoView();
        }
      }, 0);
    }
  });
}
document.body.addEventListener('focusout', () => {
  // 软键盘收起的事件处理
  if (isIOS) {
    globalScrollToEvent();
  }
});
// IOS系统下微信平台收起键盘后控制网页复原位置的事件
function globalScrollToEvent() {
  setTimeout(() => {
    let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
  }, 100);
}
