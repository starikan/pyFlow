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
        // flows: initFlows,
        flows: {
            testFlow: {
                blocks: {
                    first_block: {
                        title: "Заголовок",
                        buttons: [],
                        inputs: [{
                                type: "circle",
                                color: "red",
                                name: "Image",
                                checkFunction: () => {},
                                id: "input_image"
                            },
                            {
                                type: "triangle",
                                color: "red",
                                name: "Sigma",
                                checkFunction: () => {},
                                id: "input_sigma"
                            },
                            {
                                type: "square",
                                color: "white",
                                name: "Mean",
                                checkFunction: () => {},
                                id: "input_mean"
                            }
                        ],
                        outputs: [{
                                type: "circle",
                                color: "red",
                                name: "Image Very long name",
                                checkFunction: () => {},
                                id: "input_image"
                            },
                            {
                                type: "triangle",
                                color: "red",
                                name: "Sigma",
                                checkFunction: () => {},
                                id: "input_sigma"
                            }
                        ],
                        imgUrl: ""
                    },
                    second_block: {
                        title: "Заголовок 2",
                        buttons: [],
                        inputs: [{
                                type: "circle",
                                color: "red",
                                name: "Image",
                                checkFunction: () => {},
                                id: "input_image"
                            },
                            {
                                type: "triangle",
                                color: "red",
                                name: "Sigma",
                                checkFunction: () => {},
                                id: "input_sigma"
                            },
                            {
                                type: "square",
                                color: "white",
                                name: "Mean",
                                checkFunction: () => {},
                                id: "input_mean"
                            }
                        ],
                        outputs: [{
                                type: "circle",
                                color: "red",
                                name: "Image Very long name",
                                checkFunction: () => {},
                                id: "input_image"
                            },
                            {
                                type: "triangle",
                                color: "red",
                                name: "Sigma",
                                checkFunction: () => {},
                                id: "input_sigma"
                            }
                        ],
                        imgUrl: ""
                    }
                },
                links: {}
            }
        },
        blocks: blocks
    },
    mutations: {
        updatePosition: (state, { block_id, panX, panY, zoom }) => {
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
        savePositions: state => {}
    },
    actions: {},
    getters: {
        flowCurr: state => state.flows[state.flowCurrId],
        blocksPositions: state => state.blocksPositions[state.flowCurrId]
    }
});

export default store;