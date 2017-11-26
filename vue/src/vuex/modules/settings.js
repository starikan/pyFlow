import _mut from "../_mut";

let state = {
    settingsFlow: {
        saveOnEditToBase: true,
        zoomFlowStep: 1.1,
        flowSize: { width: 5000, height: 5000 }
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