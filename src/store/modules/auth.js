import { getUserInfo } from "@/services/authService";
const auth = {
  namespaced: true,
  state: {
    token: sessionStorage.token ? JSON.parse(sessionStorage.token) : null,
    user: sessionStorage.user ? JSON.parse(sessionStorage.user) : {},
  },

  getters: {
    isLoggedIn: (state) => {
      return state.token ? true : false;
    },
  },

  mutations: {
    SET_TOKEN(state, value) {
      state.token = value;
      sessionStorage.token = JSON.stringify(value);
    },

    SET_USER(state, value) {
      state.user = value;
      sessionStorage.user = JSON.stringify(value);
    },

    REMOVE_TOKEN(state) {
      state.token = null;
      state.user = {};
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    },
  },

  actions: {
    async getAuthUser({ commit }) {
      const res = await getUserInfo();
      const result = await res.data;
      commit("SET_USER", result.data);
      return result;
    },
  },
};

export default auth;
