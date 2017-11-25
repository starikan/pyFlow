import _mut from "../_mut";

let state = {
    settingsFlow: {
        saveOnEditToBase: true,
        zoomFlowStep: 0.1
    }
};

let mutations = {};

let actions = {};

let getters = {
    settings: state => state,
    settingsFlow: state => state.settingsFlow
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