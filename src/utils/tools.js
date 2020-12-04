function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function removeStorage(key) {
  localStorage.removeItem(key);
}
function getStorage(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data === 'undefined' ? '""' : data);
}

/**
 * @desc 函数防抖
 * @param {Function} func 回调函数
 * @param {Number} delay 防抖时间
 * @param {Object} options {
 * leading: true, // 是否在延迟之前调用
 * context: null, // 上下文
 * }
 */
function debounce(func, delay = 17, options = { leading: true, context: null }) {
  let timer;
  const _debounce = function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    if (options.leading && !timer) {
      timer = setTimeout(null, delay);
      func.apply(options.context || this, args);
    } else {
      timer = setTimeout(() => {
        func.apply(options.context || this, args);
        timer = null;
      }, delay);
    }
  };
  _debounce.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };
  return _debounce;
}
/**
 * @desc 函数节流
 * @param {Function} func 回调函数
 * @param {Number} delay 节流时间 默认1000ms
 * @param {Object} options {
 * leading: true, // 是否在延迟之前调用
 * trailing: false, //指定是否在超时后调用
 * context: null, // 上下文
 * }
 */
function throttle(func, delay = 1000, options = { leading: true, trailing: false, context: null }) {
  let previous = new Date(0).getTime();
  let timer = null;
  const _throttle = function (...args) {
    let now = new Date().getTime();
    if (!options.leading) {
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        func.apply(options.context || this, args);
      }, delay);
    } else if (now - previous > delay) {
      func.apply(options.context || this, args);
      previous = now;
    } else if (options.trailing) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(options.context || this, args);
      }, delay);
    }
  };
  _throttle.cancel = () => {
    previous = 0;
    clearTimeout(timer);
    timer = null;
  };
  return _throttle;
}
/**
 * 图片懒加载
 * 需要在标签上使用data-src
 */
function lazyImageLoad() {
  let imgList = [...document.querySelectorAll('img')];
  console.log('lazyImageLoad', imgList);
  let num = imgList.length;
  let lazyLoad = function () {};
  if (window['IntersectionObserver']) {
    /**当 img 标签进入可视区域时会执行实例化时的回调，
     * 同时给回调传入一个 entries 参数，保存着实例观察的所有元素的一些状态，
     * 比如每个元素的边界信息，当前元素对应的 DOM 节点，
     * 当前元素进入可视区域的比率，每当一个元素进入可视区域，
     * 将真正的图片赋值给当前 img 标签，同时解除对其的观察
     */
    lazyLoad = function () {
      let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
          }
        });
      });
      imgList.forEach((img) => {
        if (img.dataset.src) {
          observer.observe(img);
        }
      });
    };
  } else {
    lazyLoad = (function () {
      let count = 0;
      return function () {
        const deleteIndexList = [];
        imgList.forEach((img, index) => {
          const rect = img.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            if (img.dataset.src) img.src = img.dataset.src;
            deleteIndexList.push(index);
            count++;
            if (count === num) {
              document.removeEventListener('scroll', lazyLoad);
            }
          }
        });
        imgList = imgList.filter((_, index) => !deleteIndexList.includes(index));
      };
    })();
    document.addEventListener('scroll', throttle(lazyLoad, 100));
  }
  return lazyLoad();
}
/**
 * @desc 私有化对象属性
 * @param {Object} obj 需要私有化的变量名以 _ 开头
 */
function privatization(obj) {
  if (!window['Proxy']) {
    throw new Error('"Proxy" not support, you need babel-polyfill');
  }
  return new Proxy(obj, {
    get(target, key) {
      if (key.startsWith('_')) {
        throw new Error('private key');
      }
      return Reflect.get(target, key);
    },
    ownKeys(target) {
      return Reflect.ownKeys(target).filter((key) => !key.startsWith('_'));
    },
  });
}
/**
 * @desc async/await优化处理
 * @param {Function} asyncFunc promise对象
 * @param {Object | String} asyncFunc 传参
 * @returns {Array} [error , res]
 */
async function errorCaptured(asyncFunc, params) {
  try {
    let res = await asyncFunc(params);
    return [null, res];
  } catch (error) {
    return [error, null];
  }
}
/**
 * @desc 对象Key排序并生成key=value&
 * @param {Object} jsonObj 排序对象
 * @param {Boolean} isSort 是否排序
 */
function jsonSort(jsonObj, isSort = true) {
  let arr = [];
  for (let key in jsonObj) {
    if (jsonObj.hasOwnProperty(key)) arr.push(key);
  }
  isSort && arr.sort();
  let str = '';
  for (let i in arr) {
    // 过滤掉 Array.prototype.xxx进去的字段
    if (arr.hasOwnProperty(i)) str += arr[i] + '=' + jsonObj[arr[i]] + '&';
  }
  return str.substr(0, str.length - 1);
}
// 精度计算
function P() {
  /*
   * 判断obj是否为一个整数
   */
  function isInteger(obj) {
    return Math.floor(obj) === obj;
  }

  /*
   * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
   * @param floatNum {number} 小数
   * @return {object}
   *   {times:100, num: 314}
   */
  function toInteger(floatNum) {
    let ret = { times: 1, num: 0 };
    let isNegative = floatNum < 0;
    if (isInteger(floatNum)) {
      ret.num = floatNum;
      return ret;
    }
    let strfi = floatNum + '';
    let dotPos = strfi.indexOf('.');
    let len = strfi.substr(dotPos + 1).length;
    let times = Math.pow(10, len);
    let intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10);
    ret.times = times;
    if (isNegative) {
      intNum = -intNum;
    }
    ret.num = intNum;
    return ret;
  }

  /**
   * 核心方法，实现加减乘除运算，确保不丢失精度
   * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
   *
   * @param a {number} 运算数1
   * @param b {number} 运算数2
   * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
   *
   */
  function operation(a, b, op) {
    let o1 = toInteger(a);
    let o2 = toInteger(b);
    let n1 = o1.num;
    let n2 = o2.num;
    let t1 = o1.times;
    let t2 = o2.times;
    let max = t1 > t2 ? t1 : t2;
    let result = null;
    switch (op) {
      case 'add':
        if (t1 === t2) {
          // 两个小数位数相同
          result = n1 + n2;
        } else if (t1 > t2) {
          // o1 小数位 大于 o2
          result = n1 + n2 * (t1 / t2);
        } else {
          // o1 小数位 小于 o2
          result = n1 * (t2 / t1) + n2;
        }
        return result / max;
      case 'subtract':
        if (t1 === t2) {
          result = n1 - n2;
        } else if (t1 > t2) {
          result = n1 - n2 * (t1 / t2);
        } else {
          result = n1 * (t2 / t1) - n2;
        }
        return result / max;
      case 'multiply':
        result = (n1 * n2) / (t1 * t2);
        return result;
      case 'divide':
        result = (n1 / n2) * (t2 / t1);
        return result;
    }
  }

  function add(a, b) {
    return operation(a, b, 'add');
  }
  function subtract(a, b, digits) {
    return operation(a, b, 'subtract').toFixed(digits);
  }
  function multiply(a, b) {
    return operation(a, b, 'multiply');
  }
  function divide(a, b, digits) {
    return operation(a, b, 'divide').toFixed(digits);
  }

  // exports
  return {
    add,
    subtract,
    multiply,
    divide,
  };
}
/**
 * @desc 过滤掉空对象
 * @param {Object} body
 */
function filter(body) {
  // 过滤掉所有key为空的字段
  if (body && Object.keys(body).length > 0) {
    body = Object.keys(body).reduce((target, key) => {
      if (body[key] !== '') {
        // 要设置不等于'' 因为可能出现0
        target[key] = body[key];
      }
      return target;
    }, {});
  }
  return body;
}
/**
 *
 * @desc 获取滚动条距顶部的距离
 */
function getScrollTop() {
  return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
}
/**
 *
 * @desc  获取一个元素的距离文档(document)的位置，类似jQ中的offset()
 * @param {HTMLElement} ele
 * @returns { {left: number, top: number} }
 */
function offset(ele) {
  let pos = {
    left: 0,
    top: 0,
  };
  while (ele) {
    pos.left += ele.offsetLeft;
    pos.top += ele.offsetTop;
    ele = ele.offsetParent;
  }
  return pos;
}
function isAndroid() {
  let u = navigator.userAgent;
  // 安卓
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  return isAndroid;
}
function isIOS() {
  let u = navigator.userAgent;
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  return isIOS;
}
function isNull(data) {
  // 解决处理判断数字0=''的问题
  if (data === 0) {
    data = data.toString();
  }
  if (Array.isArray(data)) {
    return data.length === 0;
  }
  return data == null || data === '' || data === 'undefined';
}

function getUrlParam(name, url) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r;
  if (isNull(url)) {
    r = window.location.search.substr(1).match(reg);
  } else {
    let ParamList = url.split('?');
    if (ParamList.length > 1) {
      r = ParamList[1].substr(0).match(reg);
    } else {
      return url;
    }
  }
  let context = '';
  if (r != null) {
    context = r[2];
  }
  reg = null;
  r = null;
  return context == null || context === '' || context === 'undefined' ? '' : context;
}
/**
 * @desc  设置导航栏
 * @param type:showAppBa hideAppBa
 * @returns
 */
function setNav(type, title = '', isHasBack = false) {
  console.log('set nav', location.host.indexOf('bgbasis.com') > -1);
  if (location.host.indexOf('bgbasis.com') > -1) {
    location.href = `https://bridge.bgbasis.com?action=${type}&barTitle=${title}&hasBack=${isHasBack}`;
  }
}

/**
 * @desc  预览PDF附件
 * @param url:pdf附件的地址
 * @returns
 */
function showPdf(url) {
  console.log('showPdf', location.host.indexOf('bgbasis.com') > -1);
  if (location.host.indexOf('bgbasis.com') > -1) {
    location.href = `https://bridge.bgbasis.com?action=showPdf&url=${url}`;
  }
}
/**
 * @desc  预览office附件
 * @param url:office附件的地址
 * @returns
 */
function showAttach(url) {
  console.log('showAttach', location.host.indexOf('bgbasis.com') > -1);
  if (location.host.indexOf('bgbasis.com') > -1) {
    location.href = `https://bridge.bgbasis.com?action=attPreview&attUrl=${url}`;
  }
}

/**
 * @desc  隐藏键盘
 * @param 无
 * @returns
 */
function hideKeyboard() {
  if (location.host.indexOf('bgbasis.com') > -1) {
    location.href = `https://bridge.bgbasis.com?action=unfocus`;
  }
}

/**
 * 传入路由结构，返回{path:string,name:string}结构
 * @param {Array} 子路由列表
 * @param {String} 上一级路由地址
 */
function createNavStructure(routers, rootPath = '') {
  const navs = [];
  for (let i = 0; i < routers.length; i++) {
    const route = routers[i];
    const children = route.children;
    let path = rootPath;
    // 如果传入的是''，那么就赋值当前路由地址，因为子路由没有/
    if (!path) {
      path = `${route.path}`;
    } else {
      path = `${rootPath}/${route.path}`; // 子路由没有/所以得加上
    }
    // _path存储没有拼接的路由，有利于作比较
    const target = { path: path, _path: route.path, name: route?.meta?.nav_title ?? route.name };
    if (children && children.length > 0) {
      target['children'] = createNavStructure(children, path);
    }
    navs.push(target);
  }
  return navs;
}
// 这个只需要获取一次即可
let __cacheRouteTree = [];
/**
 * 传入路由结构，返回{path:string,name:string}结构
 * @param {Array} routers 子路由列表
 * @param {Boolean} catchRefresh 是否刷新缓存
 */
function getNavStructure(routers, catchRefresh = false) {
  if (!__cacheRouteTree.length || catchRefresh) {
    __cacheRouteTree = createNavStructure(routers);
  }
  return __cacheRouteTree;
}
/**
 * 路由过滤器，过滤出需要用的路由，远程路由hash没有改变，则取
 * @param {Router} local 本地路由
 * @param {Array} remote 远程路由
 */
function routeFilter(local, remote) {
  return remote.reduce((t, RRoute) => {
    // console.log('local', JSON.parse(JSON.stringify(local)));
    const LRoutes = local.filter((l) => l?.meta?.id === RRoute.id); // 过滤出id相同的路由
    // console.log('LRoutes', JSON.parse(JSON.stringify(LRoutes)));
    if (LRoutes.length === 1) {
      const LRoute = LRoutes[0];
      // 如果存在相同的路由，而且路由存在子路由，则递归进行过滤
      if (RRoute.children && LRoute.children) {
        // 替换过滤后的子路由
        LRoute.children = routeFilter(LRoute.children, RRoute.children);
      }
      LRoute.meta.nav_title = RRoute.nav_title;
      t.push(LRoute);
    }

    return t;
  }, []);
}

//封装检测数据类型的函数
function checkedType(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}
/**
 * 深度克隆
 * @param {any} target
 */
function deepClone(target) {
  let result,
    targetType = checkedType(target);
  if (targetType == 'Object') {
    result = {};
  } else if (targetType == 'Array') {
    result = [];
  } else {
    return target; //普通数据类型直接返回
  }

  for (let i in target) {
    if (target.hasOwnProperty(i)) {
      let value = target[i];
      if (checkedType(value) == 'Object' || checkedType(value) == 'Array') {
        result[i] = deepClone(value);
      } else {
        result[i] = value;
      }
    }
  }
  return result;
}
/**
 * 对象深度合并
 * @param  {...Object} objArr 需要合并的对象 内部不允许有数组
 */
function deepMerge(...objArr) {
  let ret = {};
  function handler(key, source, ret) {
    let isObj = typeof source[key] == 'object'; //判断是否是对象
    if (isObj) {
      if (!ret[key]) {
        ret[key] = {}; //键名不存在，拷贝键名
      }
      // 由于是对象、递归深度拷贝
      Object.keys(source[key]).forEach((_key) => {
        handler(_key, source[key], ret[key]);
      });
    } else {
      // 是非引用类型、直接拷贝键名所对应的值
      ret[key] = source[key];
    }
  }
  // 遍历需要拷贝的对象、逐一深度拷贝
  objArr.forEach((obj, idx, _self) => {
    Object.keys(obj).forEach((key) => {
      handler(key, obj, ret);
    });
  });
  return ret;
}
/**
 * 获取系统语言
 * @return {string} zh en
 */
function getSysLanguage() {
  return 'en';
  // return window.navigator.language.slice(0, 2);  （产品林鑫要求默认是英文，不需要根据用户浏览器）
}
/**
 * 判断当前浏览器是否是Chrome
 * @returns {String} chrome | safari | iex | edge | ff | opera
 */
function getBrowser() {
  const userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  const isOpera = userAgent.indexOf('Opera') > -1; //判断是否Opera浏览器
  // var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
  const isIE = window.ActiveXObject || 'ActiveXObject' in window;
  // var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
  const isEdge = userAgent.indexOf('Edge') > -1; //判断是否IE的Edge浏览器
  const isFF = userAgent.indexOf('Firefox') > -1; //判断是否Firefox浏览器
  const isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1; //判断是否Safari浏览器
  const isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1 && !isEdge; //判断Chrome浏览器

  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    const fIEVersion = parseFloat(RegExp['$1']);
    if (userAgent.indexOf('MSIE 6.0') != -1) {
      return 'ie6';
    } else if (fIEVersion == 7) {
      return 'ie7';
    } else if (fIEVersion == 8) {
      return 'ie8';
    } else if (fIEVersion == 9) {
      return 'ie9';
    } else if (fIEVersion == 10) {
      return 'ie10';
    } else if (userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)) {
      return 'ie11';
    } else {
      return '0';
    } //IE版本过低
  } //isIE end
  if (isFF) {
    return 'ff';
  }
  if (isOpera) {
    return 'opera';
  }
  if (isSafari) {
    return 'safari';
  }
  if (isChrome) {
    return 'chrome';
  }
  if (isEdge) {
    return 'edge';
  }
}
/**
 * 通过value找到对应key
 * @param {any} value 通过value取key
 * @param {Function} compare (a, b) => a === b 返回true或者false

 */
function findKey(data, value, compare = (a, b) => a === b) {
  return Object.keys(data).find((k) => compare(data[k], value));
}
/**
 * 给元素设置transform
 * @param {Element} ele dom
 * @param {CSSStyleSheet} style transform对应的属性
 */
function setTransform(ele, style) {
  if (!style || !ele) return;
  ele.style.webkitTransform = style;
  ele.style.MozTransform = style;
  ele.style.msTransform = style;
  ele.style.OTransform = style;
  ele.style.transform = style;
}
/**
 * pc端实现移动端滑动页面的效果
 * @param {String} domName
 * @param {Object} options { scrollY: true, scrollX: true } 滑动的轴
 */
function touchController(domName, options = {}) {
  options = Object.assign({ scrollY: true, scrollX: true }, options);
  const dom = document.querySelector(domName);
  dom.onmousedown = function (e) {
    let el = e || event;
    let Y = el.clientY;
    let X = el.clientX;
    const _dom = document.querySelector(domName);
    let ToTop = _dom.scrollTop;
    let Toleft = _dom.scrollLeft;
    dom.onmousemove = throttle(function (ev) {
      ev = ev || event;
      const subY = ev.clientY - Y;
      const subX = ev.clientX - X;
      Y = ev.clientY;
      X = ev.clientX;
      ToTop -= subY;
      Toleft -= subX;
      if (options.scrollY) {
        document.querySelector(domName).scrollTop = ToTop;
      }
      if (options.scrollX) {
        document.querySelector(domName).scrollLeft = Toleft;
      }
    }, 10);
    document.onmouseup = function () {
      dom.onmousemove = function () {
        null;
      };
    };
  };
}
function timeToTime(start, end) {
  const arr = [];
  if (!start) {
    const h = new Date().format('HH');
    const m = new Date().format('MM');
    start = +h;
    if (+m < 30) {
      arr.push(`${h}:30`);
    }
    start++;
  }
  while (end > start) {
    const h = `${start}`.addZero();
    arr.push(`${h}:00`, `${h}:30`);
    start++;
  }
  return arr;
}
function dayToDay(num) {
  const days = ['今天', '明天'];
  if (num <= 2) return days;
  const now = new Date().getTime();
  let time = 2; // 从第三天开始算
  num -= 2; // 减去今明两天的
  while (time <= num) {
    days;
    days.push(new Date(now + time * 24 * 3600 * 1000).format('mm.dd (ddd)'));
    time++;
  }
  return days;
}
export {
  timeToTime,
  dayToDay,
  touchController, // pc端实现移动端滑动页面的效果
  setTransform, // 给元素设置transform
  findKey,
  getSysLanguage,
  getBrowser,
  setStorage,
  removeStorage,
  getStorage,
  isAndroid,
  isIOS,
  debounce, // 防抖
  throttle, // 节流
  lazyImageLoad, // 图片懒加载
  privatization, // 私有化对象属性
  errorCaptured, // async/await优化处理
  jsonSort, //对象Key排序并生成key=value&
  P, // 精度计算
  filter, // 过滤掉空对象
  getScrollTop, // 获取滚动条距顶部的距离
  offset, // 获取一个元素的距离文档(document)的位置，类似jQ中的offset()
  isNull, // 判断数据是否为空
  getUrlParam, //附件名字
  setNav,
  showPdf,
  showAttach,
  hideKeyboard,
  getNavStructure, // 格式化路由，拼接路由数据
  routeFilter, // 路由过滤器
  deepClone, // 深克隆
  deepMerge, // 深合并
};
