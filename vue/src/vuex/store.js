import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import shortid from "shortid";

import { initFlows, blocks } from "./init_data";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    $flowData: {},
    currFlowId: "test_flow",
    selectedBlock: null,
    activeBlock: null,
    selectedLink: null,
    activeLink: null,
    flowSizes: {},
    flows: initFlows,
    blocks: blocks
  },
  mutations: {
    update$flowData(state, { data, evt }) {
      state.$flowData = data;
    },
    addLink(state, { linkId, linkData }) {
      let flowsClone = _.cloneDeep(state.flows);

      let fields = [
        "fromOperator",
        "fromConnector",
        "fromSubConnector",
        "toOperator",
        "toConnector",
        "toSubConnector",
        "color"
      ];

      let newData = {};
      _.forEach(linkData, (val, key) => {
        if (fields.includes(key)) {
          newData[key] = val;
        }
      });

      flowsClone[state.currFlowId].links[linkId] = newData;
      state.flows = flowsClone;
    },
    deleteLink(state, { linkId = false }) {
      let flowsClone = _.cloneDeep(state.flows);
      linkId = linkId ? linkId : state.selectedLink;
      delete flowsClone[state.currFlowId].links[linkId];
      state.flows = flowsClone;
    },
    selectLink(state, linkId) {
      state.selectedLink = linkId;
    },
    unSelectLink(state) {
      state.selectedLink = null;
    },
    setFlowSizes(state, { top, left, width, height, zoom }) {
      localStorage["flow_top"] = top ? top : 0;
      localStorage["flow_left"] = left ? left : 0;
      localStorage["flow_zoom"] = zoom ? zoom : 1;

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
    currFlowBlocks: (state, getters) => Object.keys(getters.currFlow.operators),
    currFlowLinks: (state, getters) => Object.keys(getters.currFlow.links)
  }
});

export default store;
