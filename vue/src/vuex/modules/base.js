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

let mutations = {
    UPDATE_BLOCK_POSITIONS: (state, positions) => {
        if (!state.positions[state.flowId]) {
            Object.assign(state.positions, {
                [state.flowId]: {}
            });
        }
        Object.assign(state.positions[state.flowId], positions);
    }
};

let actions = {
    // Load all flows and others from external storages and APIs
    loadAllData: ({ state, commit, dispatch, getters }) => {
        // TODO: Get flows from API
        let flows = initFlows;
        commit("SET_flows", flows);

        // TODO: remove "testFlow" when exist selector of flow
        commit("SET_flowId", lstore.get("flowId") || "testFlow");

        let positions = lstore.get("positions") || {};
        commit("SET_positions", positions);

        commit("SET_blocks", blocksCollection);
    },

    // TODO: default values
    // saveData: ({ state }, { positions = true, flowId = true, flows = true }) => {
    saveData: ({ state }) => {
        let positions = true;
        let flowId = true;
        let flows = true;
        positions ? lstore.set("positions", state.positions) : "";
        flowId ? lstore.set("flowId", state.flowId) : "";
        flows ? lstore.set("flows", state.flows) : "";
    }
};

let getters = {
    // Flow from external source, without current unsaved updates
    flow: state => _.get(state.flows, [state.flowId], {}),
    positions: state => _.get(state.positions, [state.flowId], {})
};

let hooks = {};

export default {
    namespaced: true,
    state: state,
    mutations: {
        ..._mut(state),
        ...mutations
    },
    actions: actions,
    getters: getters,
    hooks: hooks
};