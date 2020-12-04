import { get, post } from '../utils/http';
/**
 * 获取新闻
 * ```
 * pageSize 一页多少
 * currentPage 第几页
 * school 学校枚举 不填等于全部
 * ```
 */
export const api_getNews = (params) => {
  params = { pageSize: 12, currentPage: 1, ...params };
  return get('/apntent-by-school', params);
};
