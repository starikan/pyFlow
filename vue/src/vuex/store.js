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
        flowPositions: {},
        flow: {
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
        }
    },
    mutations: {},
    actions: {},
    getters: {
        flowCurr: state => state.flow.flows[state.flow.flowCurrId]
    }
});

export default store;