import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import shortid from "shortid";
import lstore from "store";

import { initFlows, blocksCollection } from "./init_data";

Vue.use(Vuex);

const store = {
    namespaced: true,
    state: {
        leftPanelShow: false,

        infoPanelShow: false,
        blockSelectedId: null,

        blocksPositions: {},
        ioCoords: {},
        flowCurrId: "testFlow",
        flows: initFlows,
        blocks: blocksCollection
    },
    mutations: {
        addLink: function(state, { dot0, dot1, link_id, style }) {
            link_id = link_id || shortid.generate();
            style = style || {};
            if (dot0.dot_type != dot1.dot_type) {
                let links = Object.assign({},
                    state.flows[state.flowCurrId].links
                );
                links[link_id] = {
                    style: style,
                    [dot0.dot_type]: {
                        block_id: dot0.block_id,
                        dot_id: dot0.dot_id
                    },
                    [dot1.dot_type]: {
                        block_id: dot1.block_id,
                        dot_id: dot1.dot_id
                    }
                };
                state.flows[state.flowCurrId].links = links;
            }
        },
        editLink: (state, { link_id }) => {},
        removeLink: (state, { link_id }) => {
            let links = Object.assign({}, state.flows[state.flowCurrId].links);
            _.unset(links, link_id);
            state.flows[state.flowCurrId].links = links;
        },
        addBlock: (state, { block_id }) => {},
        editBlock: (state, { block_id }) => {},
        removeBlock: (state, { block_id }) => {},
        selectBlock: (state, { block_id, value }) => {
            state.blockSelectedId = block_id;
        },
        toggleLeftPanel: (state, { show }) => {
            state.infoPanelShow = show && state.blockSelectedId;
        },
        updateIOCoords: (state, { block_id, ioType, ioId, coords }) => {
            let ioCoords = Object.assign({}, state.ioCoords);
            _.set(ioCoords, [block_id, ioType, ioId], coords);
            state.ioCoords = ioCoords;
        },
        updatePosition: (state, { block_id, panX, panY, zoom, fullDump }) => {
            if (!block_id) return;
            let flowCurrId = state.flowCurrId;
            let blocksPositions = Object.assign({}, state.blocksPositions);

            if (!_.get(blocksPositions, [flowCurrId, block_id])) {
                _.set(
                    blocksPositions, [flowCurrId, block_id], [1, 0, 0, 1, 0, 0]
                );
            }
            let position = _.get(blocksPositions, [flowCurrId, block_id]);

            if (_.isNumber(panX)) position[4] = panX;
            if (_.isNumber(panY)) position[5] = panY;
            if (_.isNumber(zoom)) position[0] = position[3] = zoom;

            _.set(blocksPositions, [flowCurrId, block_id], position);

            state.blocksPositions = blocksPositions;
        },
        updateAllPositions: (state, { flow_id, fullDump }) => {
            if (fullDump && _.isObject(fullDump) && !_.isEmpty(fullDump)) {
                state.blocksPositions = fullDump;
            }
        }
    },
    actions: {
        savePositions: ({ state }) =>
            lstore.set(
                "blocksPositions",
                Object.assign({}, state.blocksPositions)
            ),
        getPositions: ({ commit, state }) => {
            let blocksPositions = lstore.get("blocksPositions");
            commit("updateAllPositions", {
                fullDump: blocksPositions
            });
        }
    },
    getters: {
        flowCurr: state => state.flows[state.flowCurrId],
        linksCurr: state => state.flows[state.flowCurrId].links,
        blocksPositions: state => state.blocksPositions[state.flowCurrId]
    }
};

const mainStore = new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        oldStore: store,
        flow: {
            state: {
                blocksPositions: {}
            }
        },
        base: {
            state: {
                blocksPositions: {},
                flowId: "testFlow",
                flows: initFlows,
                blocks: blocksCollection
            },
            actions: {
                SAVE_FLOWS: () => {},

                // TODO: Get flows from API
                LOAD_FLOWS: ({ state }) => {
                    state.flows = initFlows;
                },

                SAVE_FLOW_ID: ({ state }) => lstore.set("flowId", state.flowId),

                LOAD_FLOW_ID: ({ state }) => {
                    state.flowId = lstore.get("flowId");
                },

                LOAD_BLOCKS_POSITIONS: ({ state }) => {
                    state.blocksPositions = lstore.get("blocksPositions");
                },

                UPDATE_BLOCKS_POSITIONS: ({ state, dispatch }, { positions, flowId = state.flowId }) => {
                    Object.assign(state.blocksPositions, { flowId: positions });
                    dispatch("SAVE_BLOCKS_POSITIONS");
                },

                SAVE_BLOCKS_POSITIONS: ({ state }) =>
                    lstore.set("blocksPositions", state.blocksPositions)
            },
            getters: {
                // Flow from external source, without current unsaved updates
                flow: state => state.flows[state.flowId]
            }
        },
        panels: {}
    }
});

export default mainStore;