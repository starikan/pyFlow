import _mut from "../_mut";

let state = {
    isShowLeftPanel: false,
    isShowInfoPanel: false,
    leftSubPanel: "main"
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