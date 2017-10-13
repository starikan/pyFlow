import Vue from "vue";
import Vuex from "vuex";

import initData from "./init_data";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    currFlowId: "test_flow",
    selectedBlock: null,
    activeBlock: null,
    flows: initData
  },
  mutations: {
    setBlockPosition(state, { blockId, position }) {
      let currFlow = store.getters.currFlow;

      let currTop = currFlow.operators[blockId].top;
      let currLeft = currFlow.operators[blockId].left;

      let newTop = position.top ? position.top : currTop;
      let newLeft = position.left ? position.left : currLeft;

      state.flows[state.currFlowId].operators[blockId].top = newTop;
      state.flows[state.currFlowId].operators[blockId].left = newLeft;
    },
    selectBlock: (state, blockId) => {
      state.selectedBlock = blockId ? blockId : state.selectedBlock;
    },
    unSelectBlock: state => {
      state.selectedBlock = null;
    }
    // activeBlock: (state, blockId) => {
    //   state.activeBlock = blockId ? blockId : state.activeBlock;
    // },
    // unActiveBlock: state => {
    //   state.activeBlock = null;
    // }
  },
  actions: {
    increment({ commit }) {
      setTimeout(() => {
        commit("increment");
      }, 2000);
    }
  },
  getters: {
    currFlow: state => state.flows[state.currFlowId]
  }
});

export default store;
