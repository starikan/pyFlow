import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import shortid from "shortid";
import lstore from "store";

import { initFlows, blocksCollection } from "./init_data";

import base from "./modules/base";
import flow from "./modules/flow";
import panels from "./modules/panels";

Vue.use(Vuex);

const oldStore = {
    mutations: {
        addLink: function(state, { dot0, dot1, link_id, style }) {
            link_id = link_id || shortid.generate();
            style = style || {};
            if (dot0.dot_type != dot1.dot_type) {
                let links = Object.assign({}, state.flows[state.flowCurrId].links);
                links[link_id] = {
                    style: style,
                    [dot0.dot_type]: {
                        block_id: dot0.block_id,
                        dot_id: dot0.dot_id
                    },
                    [dot1.dot_type]: {
                        block_id: dot1.block_id,
                        dot_id: dot1.dot_id
                    }
                };
                state.flows[state.flowCurrId].links = links;
            }
        },
        editLink: (state, { link_id }) => {},
        removeLink: (state, { link_id }) => {
            let links = Object.assign({}, state.flows[state.flowCurrId].links);
            _.unset(links, link_id);
            state.flows[state.flowCurrId].links = links;
        },
        addBlock: (state, { block_id }) => {},
        editBlock: (state, { block_id }) => {},
        removeBlock: (state, { block_id }) => {}
    }
};

import modulesHooks from "./plugins/hooks_plugin";

const vuexData = {
    strict: process.env.NODE_ENV !== "production",
    modules: {
        base: base,
        flow: flow,
        panels: panels
    },
    plugins: [modulesHooks]
};

const mainStore = new Vuex.Store(vuexData);

export default mainStore;