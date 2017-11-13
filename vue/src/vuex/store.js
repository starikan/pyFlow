import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import shortid from "shortid";
import lstore from "store";

import { initFlows, blocksCollection } from "./init_data";

import base from "./modules/base";
import flow from "./modules/flow";

Vue.use(Vuex);

const store = {
    namespaced: true,
    state: {
        leftPanelShow: false,

        infoPanelShow: false,

        ioCoords: {},
        flowCurrId: "testFlow",
        flows: initFlows,
        blocks: blocksCollection
    },
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
        removeBlock: (state, { block_id }) => {},
        toggleLeftPanel: (state, { show }) => {
            state.infoPanelShow = show;
        },
        updateIOCoords: (state, { block_id, ioType, ioId, coords }) => {
            let ioCoords = Object.assign({}, state.ioCoords);
            _.set(ioCoords, [block_id, ioType, ioId], coords);
            state.ioCoords = ioCoords;
        }
    },
    getters: {
        linksCurr: state => state.flows[state.flowCurrId].links
    }
};

const mainStore = new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        oldStore: store,
        base: base,
        flow: flow,
        panels: {}
    }
});

// Update current flow in 'flow' if loaded from external API
// mainStore.watch(
//     () => mainStore.getters["base/flow"],
//     data => mainStore.dispatch("flow/updateCurrentFlowFromBase", data)
// );
// mainStore.watch(
//     () => mainStore.getters["base/positions"],
//     data => {
//         console.log(data);
//         mainStore.commit("flow/SET_positions", data);
//     }
// );

export default mainStore;