import { api_login } from '../../api/api';
export default {
  namespaced: true,
  state: {
    user: {},
  },
  mutations: {
    mut_setUser(state, data) {
      state.user = data;
    },
  },
  actions: {
    async act_login({ commit }) {
      let user = await api_login();
      commit('mut_setUser', user);
    },
  },
  getters: {
    get_isLogin(state) {
      return !!Object.keys(state.user).length;
    },
  },
};
