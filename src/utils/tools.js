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
  const _debounce = function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    if (options.leading && !timer) {
      timer = setTimeout(null, delay);
      func.apply(options.context, args);
    } else {
      timer = setTimeout(() => {
        func.apply(options.context, args);
        timer = null;
      }, delay);
    }
  };
  _debounce.cancel = function() {
    clearTimeout(timer);
    timer = null;
  };
  return _debounce;
}
/**
 * @desc 函数节流
 * @param {Function} func 回调函数
 * @param {Number} delay 节流时间
 * @param {Object} options {
 * leading: true, // 是否在延迟之前调用
 * trailing: false, //指定是否在超时后调用
 * context: null, // 上下文
 * }
 */
function throttle(func, delay, options = { leading: true, trailing: false, context: null }) {
  let previous = new Date(0).getTime();
  let timer = null;
  const _throttle = function(...args) {
    let now = new Date().getTime();
    if (!options.leading) {
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        func.apply(options.context, args);
      }, delay);
    } else if (now - previous > delay) {
      func.apply(options.context, args);
      previous = now;
    } else if (options.trailing) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(options.context, args);
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
 * @desc 图片懒加载 (待验证)
 */
function lazyImageLoad() {
  let imgList = [...document.querySelectorAll('img')];
  let num = imgList.length;
  let lazyLoad = function() {};
  if (window['IntersectionObserver']) {
    /**当 img 标签进入可视区域时会执行实例化时的回调，
     * 同时给回调传入一个 entries 参数，保存着实例观察的所有元素的一些状态，
     * 比如每个元素的边界信息，当前元素对应的 DOM 节点，
     * 当前元素进入可视区域的比率，每当一个元素进入可视区域，
     * 将真正的图片赋值给当前 img 标签，同时解除对其的观察
     */
    lazyLoad = function() {
      let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
          }
        });
      });
      imgList.forEach((img) => {
        observer.observe(img);
      });
    };
  } else {
    lazyLoad = (function() {
      let count = 0;
      return function() {
        let deleteIndexList = [];
        imgList.forEach((img, index) => {
          let rect = img.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            img.src = img.dataset.src;
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
export {
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
};
