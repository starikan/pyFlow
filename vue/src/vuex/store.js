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
        flowCurrId: "testFlow",
        flows: initFlows,
        blocks: blocks
    },
    mutations: {
        updatePosition: (state, { block_id, panX, panY, zoom, fullDump }) => {
            if (!block_id) return;
            let flowCurrId = state.flowCurrId;
            let blocksPositions = _.cloneDeep(state.blocksPositions);

            if (!_.get(blocksPositions, [flowCurrId, block_id])) {
                _.set(blocksPositions, [flowCurrId, block_id], [1, 0, 0, 1, 0, 0]);
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
            lstore.set("blocksPositions", _.cloneDeep(state.blocksPositions)),
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