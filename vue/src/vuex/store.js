import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import shortid from "shortid";
import lstore from "store";

import { initFlows, blocks } from "./init_data";

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    state: {
        leftPanel: {
            isShow: false
        },
        infoPanel: {
            isShow: false
        },
        blocksPositions: {},
        ioCoords: {},
        flowCurrId: "testFlow",
        flows: initFlows,
        blocks: blocks
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
});

export default store;