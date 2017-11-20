/*
    Base is data that sync with externals. It`s not live data from flow.
*/

import lstore from "store";

import _mut from "../_mut";

import { initFlows, blocksCollection, initFlowId } from "../init_data";

let state = {
    positions: {},
    flowId: "",
    flows: {},
    blocks: {},
    flowPositions: {}
};

let mutations = {
    UPDATE_BLOCK_POSITIONS: (state, positions) => {
        state.positions = _.set(state.positions, [state.flowId], positions);
    },

    UPDATE_flowPosition: (state, flowsPosition) => {
        state.flowPositions = _.set(state.flowPositions, [state.flowId], flowsPosition);
    }
};

let actions = {};

let getters = {
    // Flow from external source, without current unsaved updates
    // flow: state => _.get(state.flows, [state.flowId], {}),
    // positions: state => _.get(state.positions, [state.flowId], {})
};

let hooks = {
    __init__: ({ state, store, moduleName }) => {
        let flows = lstore.get("flows") || initFlows;
        store.commit(moduleName + "/__set_flows", flows);

        // TODO: remove "testFlow" when exist selector of flow
        let flowId = lstore.get("flowId") || initFlowId;
        store.commit(moduleName + "/__set_flowId", flowId);

        let positions = lstore.get("positions") || {};
        store.commit(moduleName + "/__set_positions", positions);

        let flowPositions = lstore.get("flowPositions") || {};
        store.commit(moduleName + "/__set_flowPositions", flowPositions);

        store.commit(moduleName + "/__set_blocks", blocksCollection);

        // Set data into working flow base
        let currFlow = _.get(flows, [flowId], {});
        store.commit("flow/__set_flow", currFlow);
        let currPositions = _.get(positions, [flowId], {});
        store.commit("flow/__set_positions", currPositions);
        let currFlowPositions = _.get(flowPositions, [flowId], { x: 0, y: 0 });
        store.commit("flow/__set_flowPosition", currFlowPositions);
    },

    __set_flows: ({ state }) => {
        lstore.set("flows", state.flows);
    },

    __set_flowId: ({ state }) => {
        lstore.set("flowId", state.flowId);
    },

    "__set_positions, UPDATE_BLOCK_POSITIONS": ({ state }) => {
        lstore.set("positions", state.positions);
    },

    UPDATE_flowPosition: ({ state }) => {
        lstore.set("flowPositions", state.flowPositions);
    }
};

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