/*
    It`s live data from flow itteractions.
*/

import shortid from "shortid";
import merge from "deepmerge";

import _mut from "../_mut";

let state = {
    flow: {},
    flowPosition: { x: 0, y: 0 },
    flowZoom: 1,
    blocksPositions: {},
    blocksSizes: {},
    blockSelected: null,
    dotsPositions: {}
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

    UPDATE_flowZoom: (state, { delta = 1.1 }) => {
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
            [blockId]: {
                x: window.innerWidth / 2 - state.flowPosition.x,
                y: window.innerHeight / 2 - state.flowPosition.y
            }
        };
        state.flow.blocks = {...state.flow.blocks, ...newBlock };
        state.blocksPositions = {...state.blocksPositions, ...newBlockPosition };
    },

    UPDATE_BLOCK_flow: state => {},

    DELETE_BLOCK_flow: (state, blockId) => {
        // TODO: delete all links associated with block
        state.flow.blocks = _.omit(state.flow.blocks, blockId);
        state.blocksPositions = _.omit(state.blocksPositions, blockId);
    }
};

let actions = {
    centerFlow: function({ state, commit, rootState }) {
        let flowSize = rootState.settings.settingsFlow.flowSize;

        let params = merge(state.blocksSizes, state.blocksPositions);
        params = _.mapValues(params, val => {
            return {
                top: val.y,
                left: val.x,
                right: val.x + val.width,
                bottom: val.y + val.height
            };
        });

        // Find center of all blocks
        let minTop = _.min(_.map(params, val => val.top));
        let minLeft = _.min(_.map(params, val => val.left));
        let maxRight = _.max(_.map(params, val => val.right));
        let maxBottom = _.max(_.map(params, val => val.bottom));

        let moveDelta = {
            x: flowSize.width / 2 - (minLeft + maxRight) / 2,
            y: flowSize.height / 2 - (minTop + maxBottom) / 2
        };

        let widthZoom = window.innerWidth / (maxRight - minLeft);
        let heightZoom = window.innerHeight / (maxBottom - minTop);
        let newZoom = Math.min(widthZoom, heightZoom) * 0.95;

        commit("SET_flowZoom", newZoom);

        commit("SET_flowPosition", {
            x: (-flowSize.width * state.flowZoom + window.innerWidth) / 2,
            y: (-flowSize.height * state.flowZoom + window.innerHeight) / 2
        });

        _.map(state.blocksPositions, (block, blockId) => {
            commit("UPDATE_blocksPositions", {
                block_id: blockId,
                delta: moveDelta
            });
        });
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
        .map((block, blockId) => {
            return {
                [blockId]: _.map(block.dots, val => val.id)
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

    "SET_flowPosition, UPDATE_flowPosition": ({ state, store }) => {
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
    },

    "SET_flowZoom, UPDATE_flowZoom": ({ state, store }) => {
        store.commit("base/UPDATE_flowZooms", state.flowZoom);
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
    hooks: hooks
};