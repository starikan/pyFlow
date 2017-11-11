/*
    Base is data that sync with externals. It`s not live data from flow.
*/

import lstore from "store";

import _mut from "../_mut";
import { initFlows, blocksCollection } from "../init_data";

let state = {
    positions: {},
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
        commit("SET_flowId", lstore.get("new_flowId") || "testFlow");

        let positions = lstore.get("new_positions") || {};
        commit("SET_positions", positions);

        commit("SET_blocks", blocksCollection);
    },

    // TODO: remove new_ prefix
    // TODO: default values
    // saveData: ({ state }, { positions = true, flowId = true, flows = true }) => {
    saveData: ({ state }) => {
        let positions = true;
        let flowId = true;
        let flows = true;
        positions ? lstore.set("new_positions", state.positions) : "";
        flowId ? lstore.set("new_flowId", state.flowId) : "";
        flows ? lstore.set("new_flows", state.flows) : "";
    }

    // UPDATE_BLOCKS_POSITIONS: ({ state, dispatch }, { positions, flowId = state.flowId }) => {
    //     Object.assign(state.blocksPositions, { flowId: positions });
    //     dispatch("SAVE_BLOCKS_POSITIONS");
    // },
};

let getters = {
    // Flow from external source, without current unsaved updates
    flow: state => state.flows[state.flowId],
    positions: state => _.get(state.positions, [state.flowId], {})
};

export default {
    namespaced: true,
    state: state,
    mutations: Object.assign(mutations, _mut(state)),
    actions: actions,
    getters: getters
};