<template>
  <img
    class="my-img"
    ref="targetImg"
    @error="error"
    @load="load"
    :data-src="src"
    src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    :alt="alt"
    :title="title" />
</template>

<script>
// 图片懒加载功能
export default {
  name: 'my-img',
  props: {
    src: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    load: {
      type: Function,
      default: () => null,
    },
    error: {
      type: Function,
      default: () => null,
    },
  },
  data() {
    return {};
  },
  mounted() {
    const img = this.$refs.targetImg;
    if (img?.dataset.src) {
      this.$observer.observe(img);
    }
  },
};
</script>

<style lang="scss">
.my-img {
  opacity: 0;
  background: #f8f9fa;
  min-height: 0.1px; // 貌似得有个高度IntersectionObserver才能监听到
  &.img-show-ease-in {
    @keyframes fxRichTextFadeIn {
      0% {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }
    background-color: transparent;
    animation: fxRichTextFadeIn 0.2s ease-in alternate forwards;
  }
}
</style>
