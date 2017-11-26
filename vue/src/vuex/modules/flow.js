/*
    It`s live data from flow itteractions.
*/

import shortid from "shortid";

import _mut from "../_mut";

let state = {
    flow: {},
    flowPosition: { x: 0, y: 0 },
    flowZoom: 1,
    blocksPositions: {},
    blocksSizes: {},
    blockSelected: null,
    dotsPositions: {},
    draggingBlock: null
};

let mutations = {
    SET_blocksPositions: (state, positions) => {
        state.blocksPositions = Object.assign(state.blocksPositions, positions);
    },

    UPDATE_blocksPositions: (state, { block_id, delta }) => {
        let newPosition = {
            [block_id]: {
                x: _.get(state.blocksPositions, [block_id, "x"]) + delta.x,
                y: _.get(state.blocksPositions, [block_id, "y"]) + delta.y
            }
        };

        state.blocksPositions = {...state.blocksPositions, ...newPosition };
    },

    UPDATE_dotsPositions: (state, { block_id, dot_id, x, y }) => {
        _.set(state.dotsPositions, [block_id, dot_id, "x"], x);
        _.set(state.dotsPositions, [block_id, dot_id, "y"], y);
    },

    UPDATE_flowZoom: (state, { delta = 0.1 }) => {
        state.flowZoom *= delta;
    },

    UPDATE_flowPosition: (state, { deltaX, deltaY }) => {
        let newPosition = {
            x: state.flowPosition.x + deltaX,
            y: state.flowPosition.y + deltaY
        };

        state.flowPosition = newPosition;
    },

    UPDATE_LINK_flow: (state, { startDot, endDot, style = {}, linkId = null }) => {
        if (linkId) {} else {
            let newId = shortid();
            let newLink = {};

            if (startDot.dotType == endDot.dotType) {
                // TODO: Check
            } else {
                _.set(newLink, [newId], {
                    [startDot.dotType]: {
                        blockId: startDot.blockId,
                        dotId: startDot.dotId
                    },
                    [endDot.dotType]: {
                        blockId: endDot.blockId,
                        dotId: endDot.dotId
                    },
                    style: style
                });
            }

            state.flow.links = {...state.flow.links, ...newLink };
        }
    },

    DELETE_LINK_flow: (state, { linkId }) => {
        state.flow.links = _.omit(state.flow.links, linkId);
    },

    CREATE_BLOCK_flow: (state, { blockId = null, block = null }) => {
        blockId = blockId || shortid();
        let blockData = _.get(block, ["block"], {});
        let newBlock = {
            [blockId]: blockData
        };
        let newBlockPosition = {
            [blockId]: { x: 100, y: 100 }
        };
        state.flow.blocks = {...state.flow.blocks, ...newBlock };
        state.blocksPositions = {...state.blocksPositions, ...newBlockPosition };
    },

    UPDATE_BLOCK_flow: state => {},

    DELETE_BLOCK_flow: (state, blockId) => {
        state.flow.blocks = _.omit(state.flow.blocks, blockId);
        state.blocksPositions = _.omit(state.blocksPositions, blockId);
    }
};

let initBlankBlockPositions = function({ state, store }) {
    let blankPositions = {
        ..._.mapValues(state.flow.blocks, val => ({ x: 0, y: 0 })),
        ...state.blocksPositions
    };
    store.commit("flow/SET_blocksPositions", blankPositions);
};

let initBlankDotPositions = function({ state, store }) {
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
    store.commit("flow/SET_dotsPositions", blankDotPositions);
};

let hooks = {
    SET_flow: [initBlankBlockPositions, initBlankDotPositions],

    UPDATE_blocksPositions: ({ state, store }) => {
        store.commit("base/UPDATE_blocksPositions", state.blocksPositions);
    },

    UPDATE_flowPosition: ({ state, store }) => {
        store.commit("base/UPDATE_flowPosition", state.flowPosition);
    },

    "UPDATE_LINK_flow, DELETE_LINK_flow, CREATE_BLOCK_flow, UPDATE_BLOCK_flow, DELETE_BLOCK_flow": ({
        state,
        store,
        stateGlobal
    }) => {
        let saveOnEditToBase = stateGlobal.settings.settingsFlow.saveOnEditToBase;
        if (saveOnEditToBase) {
            store.commit("base/UPDATE_flows", state.flow);
        }
    }
};

export default {
    namespaced: true,
    state: state,
    mutations: {
        ..._mut(state),
        ...mutations
    },
    hooks: hooks
};