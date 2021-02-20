interface obj {
  [key: string]: any;
}
declare global {
  interface ObjectConstructor {
    /**
     * 类似ts的pick，筛选出指定对象中的字段
     */
    merge<T>(obj: obj, target: T, exclude: Array<string>): T;
  }
  interface Array<T> {
    /**
     * 移除非对象数组中的某个元素
     * @param val 要移除的元素
     */
    remove(val: string | number): Array<T>;
    /**
     * 移除非对象数组中的某个元素
     * @param val 要移除的元素
     */
    flatten(): Array<T>;
  }
  interface String {
    /**
     * 1位数字符串补零 例如：1 => 01  12 => 12
     */
    addLeftZero(): string;
    /**
     * 生成随机数文件名
     * @param length 文件名长度 默认4
     */
    randomName(length: number): string;
    /**
     * 将字符串中的key给整出来，通常用于url里面的key=value value获取
     */
    query(key: string): string;
    /**
     * 去除字符串空格
     * @param isGlobal 是否全局去除空格
     */
    trim(isGlobal?: false): string;
    /**
     * 判断是否是手机号
     */
    isMobile(): boolean;
    /**
     * 判断是否是电话号
     */
    isTel(): boolean;
    /**
     * 判断是否是邮箱
     */
    isEmail(): boolean;
    /**
     * 判断是否为身份证号 支持15位和18位
     */
    isIdCard(): boolean;
    /**
     * 判断是否为url
     */
    isUrl(): boolean;
    /**
     * 手机号空格 19800000000 ===>  198 0000 0000
     */
    phoneSpace(): string;
  }
  interface Date {
    /**
     * 支持美式时间格式
     * @param option 输入yyyy-mm-dd HH MM SS
     */
    format(format: string): string;
  }
  interface Promise<T> {
    /** 将promise的reject也使用resolve返回 */
    is<TResult1 = T, TResult2 = never>(): Promise<TResult1 | TResult2>;
  }
}
// 注意: 修改"全局声明"必须在模块内部, 所以至少要有 export{}字样
// 不然会报错❌: 全局范围的扩大仅可直接嵌套在外部模块中或环境模块声明中
export {};
