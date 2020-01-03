import { get, post } from '../utils/http';

/**
 * @dec 假数据post
 * @param {Object} params
 */
export const api_getPostData = (params = {}) => {
  return post('https://www.easy-mock.com/mock/5d495268b9d4ac22f1a7c07a/example/getPostData', {});
};
/**
 * @dec 假数据get
 * @param {Object} num=123 age=25
 */
export const api_geGetData = (params = {}) => {
  return get('https://www.easy-mock.com/mock/5d495268b9d4ac22f1a7c07a/example/getGetData');
};
/**
 * @dec 模拟登陆
 * @param {Object}
 */
export const api_login = (params = {}) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({
        name: 'zzx',
      });
    }, 1000);
  });
};
