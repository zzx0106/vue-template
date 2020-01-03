<template>
  <div class="child">
    <h1>PERMISSION</h1>
    <div>is login ? {{get_isLogin ? 'yes' : 'no'}}</div>
    <div>user: {{user}}</div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapState('test', ['user']),
    ...mapGetters('test', ['get_isLogin']),
  },
};
</script>

<style lang="scss" scoped>
.child {
  height: 100vh;
  h1 {
    font-family: 'Courier New', Courier, monospace;
    font-size: 30px;
    line-height: 32px;
  }
  .box {
    background: red;
    width: 100px;
    height: 100px;
  }
}
</style>
