/*
    It`s live data from flow itteractions.
*/

import _mut from "../_mut";

let state = {
    positions: {},
    flow: {}
};

let mutations = {
    SET_positions: (state, positions) => {
        let blankPositions = _.keys(state.flow.blocks).map(key => ({
            [key]: { x: 0, y: 0 }
        }));
        positions = Object.assign({}, ...blankPositions, positions);
        state.positions = Object.assign(state.positions, positions);
        console.log(state.positions);
    },

    UPDATE_BLOCK_POSITION: (state, coords) => {
        state.positions = Object.assign(state.positions, coords);
        console.log(state.positions);
    }
};

let actions = {};

let getters = {};

export default {
    namespaced: true,
    state: state,
    mutations: Object.assign(_mut(state), mutations),
    actions: actions,
    getters: getters
};