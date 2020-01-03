<template>
  <div class="child">
    <h1>CHILD</h1>
    <div>is login ? {{get_isLogin ? 'yes' : 'no'}}</div>
    <div>user: {{user}}</div>
    <button @click="fetchData('post')">getPostData</button>
    <button @click="fetchData('get')">getGetData</button>
    <div>POST: {{postData}}</div>
    <br> <br> <br>
    <div>GET: {{getData}}</div>
  </div>
</template>
<script>
import { api_getPostData, api_geGetData } from '../../api/api';
import { mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      postData: '',
      getData: '',
    };
  },
  computed: {
    ...mapState('test', ['user']),
    ...mapGetters('test', ['get_isLogin']),
  },
  methods: {
    async fetchData(type) {
      try {
        if (type === 'post') {
          const postData = await api_getPostData();
          this.postData = postData.msg;
        } else {
          const getData = await api_geGetData();
          console.log(getData);
          this.getData = getData.msg;
        }
      } catch (error) {
        console.error('接口请求失败', error);
      }
    },
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
}
</style>
