<template>
  <div class="other">
    <h1>Other</h1>
    测试spa prerender
    <br>
    <br>
    <router-link to="/">返回HOME</router-link>
  </div>
</template>
<script>
export default {
  // metaInfo: {
  //   title: 'other页面标题title',
  //   meta: [
  //     {
  //       name: 'keyWords',
  //       content: '首页页面可以other1,2,3,4,5,6s ',
  //     },
  //   ],
  // },
};
</script>

<style lang="scss" scoped>
.other {
  height: 100vh;
  h1 {
    font-family: 'Courier New', Courier, monospace;
    font-size: 40px;
    line-height: 62px;
  }
  .box {
    width: 100px;
    height: 100px;
  }
}
</style>
