import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import shortid from "shortid";
import lstore from "store";

import { initFlows, blocks } from "./init_data";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    leftPanel: {
      isShow: false
    },
    infoPanel: {
      isShow: false
    },
    flow: {
      flowCurrId: null,
      flows: initFlows,
      blocks: blocks
    }
  },
  mutations: {},
  actions: {},
  getters: {}
});

export default store;
