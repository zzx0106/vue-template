function check_isNum(msg) {
  return (rule, value, callback) => {
    const age = /^[0-9]*$/;
    if (!age.test(value)) {
      callback(new Error(msg));
    } else {
      callback();
    }
  };
}
function check_isPhone(msg = '请输入正确手机号') {
  return (rule, value, callback) => {
    console.log('value:::::::::::::::::::::::::::', value);
    if (rule.required) {
      if (value.isMobile()) {
        callback();
      } else {
        callback(new Error(msg));
      }
    } else {
      if (value === '') {
        rule.required = false;
        callback();
      } else if (value.isMobile()) {
        rule.required = false;
        callback();
      } else {
        rule.required = true;
        callback(new Error(msg));
      }
    }
  };
}
function check_isPwd(msg = '密码长度需为8-16位，且同时含有数字和字母') {
  return (rule, value, callback) => {
    if (value === '******') return callback();
    // /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{8,16}$/
    const reg = /^(?![0-9\W\_]+$)(?![a-zA-Z\W\_]+$)[0-9A-Za-z\W\_]{8,16}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error(msg));
    }
  };
}
function check_samePwd(msg = '新密码与旧密码相同', key = '') {
  return function (rule, value, callback) {
    let data = this;
    let _key = key;
    _key = key.split('.');
    while (_key.length) {
      const getKey = _key.shift();
      data = data[getKey];
    }
    console.log('data', data);
    if (value === data) {
      callback(new Error(msg));
    } else {
      callback();
    }
  };
}
function check_recheckPwd(msg = '两次密码输入不一致', key = '') {
  return function (rule, value, callback) {
    let data = this;
    let _key = key;
    _key = key.split('.');
    while (_key.length) {
      const getKey = _key.shift();
      data = data[getKey];
    }
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== data) {
      callback(new Error(msg));
    } else {
      callback();
    }
  };
}
function check_isIdCard(msg = '证件号输入错误') {
  return (rule, value, callback) => {
    const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    console.log('校验身份证', rule.required, reg.test(value), value);
    if (rule.required) {
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error(msg));
      }
    } else {
      if (value === '') {
        rule.required = false;
        callback();
      } else if (reg.test(value)) {
        rule.required = false;
        callback();
      } else {
        rule.required = true;
        callback(new Error(msg));
      }
    }
  };
}
function check_isArr(msg = '数组不能为空') {
  console.log('11111111111111111111111111111111111');
  return (rule, value, callback) => {
    console.log('--------------------------------', rule, value, callback);
    if (rule.required) {
      console.log('value', value);
      if (value.length > 0) {
        callback();
      } else {
        callback(new Error(msg));
      }
    }
  };
}
/**
 * 大于0的正整数
 */
function check_isInteger(msg = '请输入正确的数字') {
  return (rule, value, callback) => {
    const reg = /^[1-9]\d*$/;
    if (rule.required) {
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error(msg));
      }
    } else {
      if (value === '') {
        rule.required = false;
        callback();
      } else if (reg.test(value)) {
        rule.required = false;
        callback();
      } else {
        rule.required = true;
        callback(new Error(msg));
      }
    }
  };
}
/**
 * 验证是否大于0切只带一位小数的
 */
function check_isDiscount(msg = '请输入正确的数字') {
  return (rule, value, callback) => {
    const reg = /^(?!0(\.0{1})?$)(\d(\.\d{1})?|10)$/;
    if (rule.required) {
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error(msg));
      }
    } else {
      if (value === '') {
        rule.required = false;
        callback();
      } else if (reg.test(value)) {
        rule.required = false;
        callback();
      } else {
        rule.required = true;
        callback(new Error(msg));
      }
    }
  };
}
/**
 * 是否是正整数金额
 */
function check_isPrice(msg = '请输入正确的数字') {
  return (rule, value, callback) => {
    const reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
    if (rule.required) {
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error(msg));
      }
    } else {
      if (value === '') {
        rule.required = false;
        callback();
      } else if (reg.test(value)) {
        rule.required = false;
        callback();
      } else {
        rule.required = true;
        callback(new Error(msg));
      }
    }
  };
}
export {
  check_isNum,
  check_isPhone,
  check_isPwd,
  check_samePwd,
  check_recheckPwd,
  check_isIdCard,
  check_isArr,
  check_isInteger,
  check_isDiscount,
  check_isPrice,
};
