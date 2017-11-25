/*
    Base is data that sync with externals. It`s not live data from flow.
*/

import lstore from "store";

import _mut from "../_mut";

import { initFlows, blocksCollection, initFlowId } from "../init_data";

let state = {
    blocksPositions: {},
    flowId: "",
    flows: {},
    blocks: {},
    flowPositions: {}
};

let mutations = {
    UPDATE_blocksPositions: (state, positions) => {
        state.blocksPositions = _.set(state.blocksPositions, [state.flowId], positions);
    },

    UPDATE_flowPosition: (state, flowsPosition) => {
        state.flowPositions = _.set(state.flowPositions, [state.flowId], flowsPosition);
    },

    UPDATE_flows: (state, flow) => {
        state.flows = _.set(state.flows, [state.flowId], flow);
    }
};

let actions = {};

let getters = {};

let hooks = {
    __init__: ({ state, store, moduleName }) => {
        let flows = lstore.get("flows") || initFlows;
        store.commit(moduleName + "/__set_flows", flows);

        // TODO: remove "testFlow" when exist selector of flow
        let flowId = lstore.get("flowId") || initFlowId;
        store.commit(moduleName + "/__set_flowId", flowId);

        let blocksPositions = lstore.get("blocksPositions") || {};
        store.commit(moduleName + "/__set_blocksPositions", blocksPositions);

        let flowPositions = lstore.get("flowPositions") || {};
        store.commit(moduleName + "/__set_flowPositions", flowPositions);

        store.commit(moduleName + "/__set_blocks", blocksCollection);

        // Set data into working flow base
        let currFlow = _.get(flows, [flowId], {});
        store.commit("flow/__set_flow", currFlow);
        let currPositions = _.get(blocksPositions, [flowId], {});
        store.commit("flow/__set_blocksPositions", currPositions);
        let currFlowPositions = _.get(flowPositions, [flowId], { x: 0, y: 0 });
        store.commit("flow/__set_flowPosition", currFlowPositions);
    },

    "__set_flows, UPDATE_flows": ({ state }) => {
        lstore.set("flows", state.flows);
    },

    __set_flowId: ({ state }) => {
        lstore.set("flowId", state.flowId);
    },

    "__set_blocksPositions, UPDATE_blocksPositions": ({ state }) => {
        lstore.set("blocksPositions", state.blocksPositions);
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