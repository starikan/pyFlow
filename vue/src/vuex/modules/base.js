/*
    Base is data that sync with externals. It`s not live data from flow.
*/

import lstore from "store";

import _mut from "../_mut";
import { initFlows, blocksCollection } from "../init_data";

let state = {
    blocksPositions: {},
    flowId: "",
    flows: {},
    blocks: {}
};

let mutations = {};

let actions = {
    // Load all flows and others from external storages and APIs
    loadAllData: ({ state, commit, dispatch, getters }) => {
        // TODO: Get flows from API
        let flows = initFlows;
        commit("SET_flows", flows);

        // TODO: remove "testFlow"
        commit("SET_flowId", lstore.get("flowId") || "testFlow");

        commit("SET_blocksPositions", lstore.get("blocksPositions"));

        commit("SET_blocks", blocksCollection);

        // dispatch("SET_FLOW", getters.flow, { root: true });
    }

    // SAVE_FLOW_ID: ({ state }) => {
    //     lstore.set("flowId", state.flowId);
    // },

    // UPDATE_BLOCKS_POSITIONS: ({ state, dispatch }, { positions, flowId = state.flowId }) => {
    //     Object.assign(state.blocksPositions, { flowId: positions });
    //     dispatch("SAVE_BLOCKS_POSITIONS");
    // },

    // SAVE_BLOCKS_POSITIONS: ({ state }) =>
    //     lstore.set("blocksPositions", state.blocksPositions)
};

let getters = {
    // Flow from external source, without current unsaved updates
    flow: state => state.flows[state.flowId]
};

export default {
    namespaced: true,
    state: state,
    mutations: Object.assign(mutations, _mut(state)),
    actions: actions,
    getters: getters
};