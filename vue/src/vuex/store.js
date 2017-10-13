import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import shortid from "shortid";

import { initFlows, blocks } from "./init_data";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    currFlowId: "test_flow",
    selectedBlock: null,
    activeBlock: null,
    flowSizes: {},
    flows: initFlows,
    blocks: blocks
  },
  mutations: {
    sanitizeLinks(state) {},
    addLink(state) {},
    removeLink(state) {},
    setFlowSizes(state, { top, left, width, height, zoom }) {
      state.flowSizes = {
        top: top ? top : state.flowSizes.top,
        left: left ? left : state.flowSizes.left,
        width: width ? width : state.flowSizes.width,
        height: height ? height : state.flowSizes.height,
        zoom: zoom ? zoom : state.flowSizes.zoom
      };
    },
    addBlock(state, blockName) {
      let newBlock = _.cloneDeep(state.blocks[blockName].block);
      newBlock.top = state.flowSizes.height / 2 - state.flowSizes.top;
      newBlock.left = state.flowSizes.width / 2 - state.flowSizes.left;
      let id = `${blockName}_${shortid.generate()}`;

      let flowsClone = _.cloneDeep(state.flows);
      flowsClone[state.currFlowId].operators[id] = newBlock;
      state.flows = flowsClone;
    },
    deleteBlock(state, blockId) {
      let flowsClone = _.cloneDeep(state.flows);
      blockId = blockId ? blockId : state.selectedBlock;
      delete flowsClone[state.currFlowId].operators[blockId];
      state.flows = flowsClone;
    },
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
    currFlow: state => state.flows[state.currFlowId],
    currFlowBlocks: (state, getters) => Object.keys(getters.currFlow.operators)
  }
});

export default store;
