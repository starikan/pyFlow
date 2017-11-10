/*
    It`s live data from flow itteractions.
*/

import _mut from "../_mut";

let state = {
    blocksPositions: {},
    flow: {}
};

let mutations = {};

let actions = {
    // TODO: replace on mutation
    updateCurrentFlow: ({ commit, rootGetters }, flow) => {
        flow = flow || rootGetters["base/flow"];
        commit("SET_flow", flow);
    }
};

let getters = {};

export default {
    namespaced: true,
    state: state,
    mutations: Object.assign(mutations, _mut(state)),
    actions: actions,
    getters: getters
};