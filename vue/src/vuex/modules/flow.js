/*
    It`s live data from flow itteractions.
*/

import _mut from "../_mut";

let state = {
    positions: {},
    flow: {}
};

let mutations = {};

let actions = {};

let getters = {};

export default {
    namespaced: true,
    state: state,
    mutations: Object.assign(mutations, _mut(state)),
    actions: actions,
    getters: getters
};