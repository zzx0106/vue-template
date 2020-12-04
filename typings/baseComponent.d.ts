import Vue from 'vue'; // 引用了type和value
import { RawLocation, Route } from 'vue-router';
type BDMap = {
  Map(): void;
  Point(): void;
};
type CustomOverlay = {
  /** 坐标标属性 */
  _point: { lat: number; lng: number };
  /** 显示文案 */
  _text: string;
  /** BDMap容器对象 */
  _container: BDMap;
};
declare module 'vue/types/vue' {
  interface Vue {
    $map: {
      /**
       * 标注上自定义气泡
       * @param _point 坐标标属性
       * @param _text 显示文案
       * @param _container BDMap容器对象
       */
      CustomOverlay(_point: { lat: number; lng: number }, _text: string, _container: BDMap): void;
      /** 初始化 */
      init(): Promise<BDMap>;
    };
    /** 跳转指定页面 */
    navigateTo(payload: RawLocation): Promise<Route>;
    $observer: IntersectionObserver;
    /** 
     * 创建interval定时器 
     ```javascript
      this.creatTimeout(() => {
        // todo 
      }, 2000)
      ```
     */
    creatTimeout(callback: Function, duration?: number): NodeJS.Timeout;
    /** 创建interval定时器
      ```javascript
      this.creatInterval(() => {
        // todo 
      }, 2000)
      ```
     */
    creatInterval(callback: Function, duration?: number): NodeJS.Timeout;
    /**
     * 页面向上滚动到top的高度
     * @param top 想上滚动的距离
     * @param duration 滚动的时间
     */
  }
}
