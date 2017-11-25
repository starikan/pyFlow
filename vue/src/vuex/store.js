import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import shortid from "shortid";
import lstore from "store";

import { initFlows, blocksCollection } from "./init_data";

import base from "./modules/base";
import flow from "./modules/flow";
import panels from "./modules/panels";
import settings from "./modules/settings";

Vue.use(Vuex);

import modulesHooks from "./plugins/hooks_plugin";

const vuexData = {
    strict: process.env.NODE_ENV !== "production",
    modules: {
        base: base,
        flow: flow,
        panels: panels,
        settings: settings
    },
    plugins: [modulesHooks]
};

const mainStore = new Vuex.Store(vuexData);

export default mainStore;