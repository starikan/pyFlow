/*
    It`s live data from flow itteractions.
*/

import _mut from "../_mut";

let state = {
    flow: {},
    positions: {},
    dotsPositions: {},
    draggingBlock: null,
    flowZoom: 1,
    flowPosition: { x: 0, y: 0 }
};

let mutations = {
    __set_positions: (state, positions) => {
        state.positions = Object.assign(state.positions, positions);
    },

    UPDATE_BLOCK_POSITION: (state, { block_id, delta }) => {
        let newPosition = {
            [block_id]: {
                x: _.get(state.positions, [block_id, "x"]) + delta.x,
                y: _.get(state.positions, [block_id, "y"]) + delta.y
            }
        };

        state.positions = {...state.positions, ...newPosition };
    },

    UPDATE_DOT_POSITION: (state, { block_id, dot_id, x, y }) => {
        _.set(state.dotsPositions, [block_id, dot_id, "x"], x);
        _.set(state.dotsPositions, [block_id, dot_id, "y"], y);
    },

    ZOOM_IN: state => {
        state.flowZoom += 0.1;
    },

    ZOOM_OUT: state => {
        state.flowZoom -= 0.1;
    },

    UPDATE_flowPosition: (state, { deltaX, deltaY }) => {
        let newPosition = {
            x: state.flowPosition.x + deltaX,
            y: state.flowPosition.y + deltaY
        };

        state.flowPosition = newPosition;
    }
};

let actions = {};

let getters = {};

let hooks = {
    __init__: ({ state, payload }) => {
        console.log("Init hook", state, payload);
    },
    __set_flow: ({ state, store }) => {
        // Init blank positions
        let blankPositions = _(state.flow.blocks)
            .map((val, key) => ({
                [key]: { x: 0, y: 0 }
            }))
            .reduce((result, value) => {
                return {...result, ...value };
            });
        blankPositions = {...blankPositions, ...state.positions };

        store.commit("flow/__set_positions", blankPositions);

        // Init blank dot position
        let blankDotPositions = _(state.flow.blocks)
            .map((val, key) => {
                let inputs = _.map(_.get(val, ["inputs"]), "id");
                let outputs = _.map(_.get(val, ["outputs"]), "id");
                let res = inputs.concat(outputs);
                return {
                    [key]: res
                };
            })
            .reduce((result, value) => {
                return {...result, ...value };
            });

        blankDotPositions = _.mapValues(blankDotPositions, val => {
            return _.map(val, (val_in, key_in) => {
                return {
                    [val_in]: { x: 0, y: 0 }
                };
            }).reduce((result, value) => {
                return {...result, ...value };
            });
        });

        blankDotPositions = {...blankDotPositions, ...state.dotsPositions };
        store.commit("flow/__set_dotsPositions", blankDotPositions);
    },

    UPDATE_BLOCK_POSITION: ({ state, store }) => {
        store.commit("base/UPDATE_BLOCK_POSITIONS", state.positions);
    },

    UPDATE_flowPosition: ({ state, store }) => {
        store.commit("base/UPDATE_flowPosition", state.flowPosition);
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