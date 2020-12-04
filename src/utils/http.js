import Axios from 'axios';
import { getStorage } from './tools';
//公共参数
const axios = Axios.create({
  baseURL: process.env.API_BASEURL,
  timeout: 120000,
  headers: {
    Accept: 'application/json, text/javascript, */*',
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Content-Type': 'application/json; charset=UTF-8',
    // SID: 'e3ecef16-a4cc-48c6-9815-22f38c6484d9',
  },
});
// 带cookie请求
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  (config) => {
    config['headers']['LOCALE'] = getStorage('__language__') || 'zh';
    console.log('config.url', config.url);
    console.log(`%c 发送 ${config.url.replace(/\/(\w+)\//, '')} `, 'background:#2472C8;color:#fff', config.data);
    return config;
  },
  (error) => {
    console.error(error.message);
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (result) => {
    console.log('result', result);
    const code = result.data.code;
    console.log(
      `%c 接收 ${result.config.url.split('/').pop()}`,
      'background:#1E1E1E;color:#bada55',
      JSON.parse(JSON.stringify(result.data))
    );
    if (code === '000') {
      return result.data;
    } else {
      // Toast(result.data.message);
      return Promise.reject(result.data);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
export function get(url, params) {
  return axios.get(`${url}`, { params: params });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

export function post(url, params) {
  return axios.post(`${url}`, params);
}
