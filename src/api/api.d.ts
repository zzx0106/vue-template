type Res<T> = {
  code: string;
  data: T;
  fullMessage: any;
  success: boolean;
  type: string;
};
/**
 ```
 
 ```
 */
type School = 'A' | 'B' | 'C';
type SchoolInfo = {
  id: string;
  /** 标题 */
  title: string;
  url: string;
  /** 跳穿件时间 */
  createTime: string;
  /** 跳转地址 */
  jumpUrl: string;
  /** 中文摘要 */
  applyTime: string;
  /** 中文摘要 */
  zhSummary: string;
  /** 英文摘要 */
  enSummary: string;
};
/**
 *
 * @param School 'A' | 'B' | 'C';
 */
export function api_getNews(params: {
  school: School;
  pageSize: number;
  currentPage: number;
}): Promise<Res<SchoolInfo[]>>;
