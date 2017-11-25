import _mut from "../_mut";

let state = {
    settingsFlow: {
        saveOnEditToBase: true
    }
};

let mutations = {};

let actions = {};

let getters = {};

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