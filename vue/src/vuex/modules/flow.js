/*
    It`s live data from flow itteractions.
*/

import _mut from "../_mut";

let state = {
    positions: {},
    flow: {},
    dotsPositions: {},
    draggingBlock: null
};

let mutations = {
    SET_positions: (state, positions) => {
        let blankPositions = _.keys(state.flow.blocks).map(key => ({
            [key]: { x: 0, y: 0 }
        }));
        positions = Object.assign({}, ...blankPositions, positions);
        state.positions = Object.assign(state.positions, positions);
    },

    UPDATE_BLOCK_POSITION: (state, coords) => {
        state.positions = {...state.positions, ...coords };
    },

    UPDATE_DOT_POSITION: (state, { block_id, dot_id, x, y }) => {
        console.log(block_id, dot_id, x, y);
        // state.positions = {...state.positions, ...coords };
    }
};

let actions = {};

let getters = {};

export default {
    namespaced: true,
    state: state,
    mutations: {
        ..._mut(state),
        ...mutations
    },
    actions: actions,
    getters: getters
};