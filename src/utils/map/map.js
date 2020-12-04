// function BDMap() {
//   return new Promise(function (resolve, reject) {
//     window.onload = function () {
//       resolve(BMap);
//     };
//     const script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = 'https://api.map.baidu.com/api?callback=initialize&v=2.0&ak=HV8TTKTOEN3whxYqAqttETK6ALRutDvt&callback=init';
//     script.onerror = reject;
//     document.head.appendChild(script);
//   });
// }
// function initialize() {
//   const mp = new BMap.Map('map');
//   mp.centerAndZoom(new BMap.Point(121.491, 31.233), 11);
// }
// export default BDMap;

const VueMap = {
  install: function (Vue) {
    Vue.prototype.$map = new (class {
      CustomOverlay = null;
      init() {
        console.log('init------init------init');
        return new Promise((resolve, reject) => {
          try {
            const importScript = () => {
              const script = document.createElement('script');
              script.type = 'text/javascript';
              script.src = 'https://api.map.baidu.com/api?callback=initMap&v=2.0&ak=HV8TTKTOEN3whxYqAqttETK6ALRutDvt';
              script.onerror = reject;
              document.head.appendChild(script);
            };
            const timer = setTimeout(() => importScript, 5000);
            window.initMap = () => {
              // 取消默认窗口
              resolve(window.BMap);
              this.CustomOverlay = require('@/utils/map/CustomOverlay');
              clearTimeout(timer);
            };
            importScript();
          } catch (error) {
            console.error('init error', error);
            reject(error);
          }
        });
      }
    })();
  },
};
export default VueMap;
