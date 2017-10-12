import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    increment({ commit }) {
      setTimeout(() => {
        commit("increment");
      }, 2000);
    }
  },
  getters: {
    countPlus10: state => state.count + 10
  }
});

export default store;
