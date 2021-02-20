import dateFormat from '@/lib/date_format';
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

/** 判断对象是否是promise对象 */
function isPromise(obj) {
  return (
      !!obj && //有实际含义的变量才执行方法，变量null，undefined和''空串都为false
      (typeof obj === 'object' || typeof obj === 'function') && // 初始promise 或 promise.then返回的
      typeof obj.then === 'function'
  );
}
function inject(target, methodName, callback) {
  if (!target || !methodName || !callback) {
    return console.warn(`注入方法 -->${target} -- ${methodName} --${callback} 失败`);
  }
  Object.defineProperty(target, methodName, {
    writable: true,
    enumerable: false, // 不可枚举
    configurable: true,
    value: callback,
  });
}
// 筛选出指定对象中的字段
inject(Object.prototype, 'merge', function () {
  if (arguments.length < 2) {
    console.warn('pick 需要传递两个参数');
    return arguments[0];
  }
  let [obj, target, exclude] = arguments;
  if (!isObject(obj) || !isObject(target)) return console.error('merge方法传入字段必须为object类型', obj, target);
  if (exclude && !isArray(exclude)) return console.error('merge方法传入字段exclude必须为Array类型');
  return Object.entries(target).reduce((target, [key, value]) => {
    let exkey = '';
    if (exclude && exclude.length > 0) {
      let index = -1;
      for (let i = 0; i < exclude.length; i++) {
        if (exclude[i] === key) {
          index = i;
          break;
        }
      }
      if (index > -1) {
        exkey = exclude.splice(index, 1)[0];
      }
    }
    if (exkey) {
      target[key] = value;
    } else {
      target[key] = obj[key] !== undefined ? obj[key] : value;
    }
    return target;
  }, {});
});
// 移除数组中某个元素
inject(Array.prototype, 'remove', function (val) {
  let index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
  return this;
});
// 数组扁平化
inject(Array.prototype, 'flatten', function () {
  function flatten(arr) {
    return arr.reduce((a, b) => [].concat(Array.isArray(a) && a ? flatten(a) : a, Array.isArray(b) && b ? flatten(b) : b), []);
  }
  return flatten(this);
});
//将字符串中的key给整出来，通常用于url里面的key=value value获取
inject(String.prototype, 'query', function (key) {
  let _result = {};
  this.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (_result[k] = v));
  return _result[key];
});

/**  去除前后空格 */
inject(String.prototype, 'trim', function (isGlobal = false) {
  if (isGlobal) {
    // 是否删除所有空格
    return this.replace(/\s/g, '');
  }
  return this.replace(/(^\s*)|(\s*$)/g, '');
});

/** 去除数组为空的项 */
inject(Array.prototype, 'trim', function () {
  if (Array.isArray(this)) {
    return this.filter((i) => i);
  }
  return this;
});

// 是否是手机
inject(String.prototype, 'isMobile', function () {
  // return /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(this.trim());
  return /^1[0-9]{10}$/.test(this.trim());
});
// 是否是电话
inject(String.prototype, 'isTel', function () {
  return /^[014]\d{9,11}$/.test(this.trim());
});
// 是否是email
inject(String.prototype, 'isEmail', function () {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(this.trim());
});
// 判断是否为身份证号 支持15位和18位
inject(String.prototype, 'isIdCard', function () {
  return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(
      this.trim()
  );
});
// 判断是否为url
inject(String.prototype, 'isUrl', function () {
  return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(this.trim());
});
/**
 * 手机号空格 19800000000 ===>  198 0000 0000
 */
inject(String.prototype, 'phoneSpace', function () {
  return this.replace(/(\d{3})(\d{4})/, '$1 $2 ');
});
/**
 "1" => "01"
 "4" => "04"
 "99" => "99"
 */
inject(String.prototype, 'addLeftZero', function () {
  return ('00' + this).slice(-2);
});
/** 生成随机数名 */
inject(String.prototype, 'randomName', function (length = 4) {
  return Math.random().toString().slice(-length) + this.slice(this.lastIndexOf('.'));
});
/** 格式化Date */
inject(Date.prototype, 'format', function (mask, utc) {
  return dateFormat(this, mask, utc);
});

inject(Promise.prototype, 'is', async function () {
  const is = isPromise(this);
  if (!is) return this;
  try {
    const _this = await this;
    return Promise.resolve(_this);
  } catch (error) {
    console.log('this error', error);
    return Promise.resolve(error);
  }
});
