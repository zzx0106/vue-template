import { jsonSort, throttle } from '@/utils/tools';

// 可用于统一处理组件
const BaseComponent = {
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    callPhone(phone) {
      phone && (window.location.href = `tel:${phone}`);
    },
    sendEmail(email) {
      email && (location.href = `mailto:${email}`);
    },
    navigateTo: throttle(function (payload) {
      try {
        this.$router.push(payload);
      } catch (error) {
        console.warn('跳转可能有误', payload, error);
      }
    }),
    // ------------- vue
    /** 创建timeout定时器 */
    creatTimeout(callback, duration = 1000) {
      let timer = setTimeout(callback, duration);
      this.$once('hook:beforeDestroy', function () {
        clearInterval(timer);
      });
      return timer;
    },
    /** 创建interval定时器 */
    creatInterval(callback, duration = 1000) {
      let timer = setInterval(callback, duration);
      this.$once('hook:beforeDestroy', function () {
        clearInterval(timer);
      });
      return timer;
    },
  },
  computed: {},
  filters: {},
};
export default BaseComponent;
