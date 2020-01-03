import Axios from 'axios';
import { jsonSort } from './tools';
//公共参数
const axios = Axios.create({
  baseURL: process.env.API_BASEURL,
  timeout: 120000,
  headers: {
    Accept: 'application/json, text/javascript, */*',
    'Content-Type': 'application/json;charset=utf-8',
  },
});
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error(error.message);
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (result) => {
    return result.data;
  },
  (error) => {
    if (error && error.response.status) {
      switch (error.response.status) {
        case 401:
          error.message = '未授权，请登录';
          /* 跳转登录页 */
          // window.location.replace(location.origin + '/user/login');
          break;
        default:
          error.message = '请求失败';
      }
    }
    return Promise.reject(error);
  }
);

function get(url, body = {}) {
  if (Object.keys(body).length > 0) {
    return axios.get(`${url}?${jsonSort(body)}`);
  }
  return axios.get(url);
}
function post(url, body) {
  return axios.post(url, body);
}

export { get, post };
