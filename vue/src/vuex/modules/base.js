/*
    Base is data that sync with externals. It`s not live data from flow.
*/

import lstore from "store";

import _mut from "../_mut";

import { initFlows, blocksCollection, initFlowId, initServersAPI } from "../init_data";

let state = {
    flows: {},
    flowId: "",
    flowPositions: {},
    flowZooms: {},
    blocksBootstrap: {},
    blocksPositions: {},
    serversAPI: {},
    websocketsAPI: {}
};

let mutations = {
    UPDATE_blocksPositions: (state, positions) => {
        state.blocksPositions = _.set(state.blocksPositions, [state.flowId], positions);
    },

    UPDATE_flowPosition: (state, flowPosition) => {
        state.flowPositions = _.set(state.flowPositions, [state.flowId], flowPosition);
    },

    UPDATE_flowZooms: (state, flowZoom) => {
        state.flowZooms = _.set(state.flowZooms, [state.flowId], flowZoom);
    },

    UPDATE_flows: (state, flow) => {
        state.flows = _.set(state.flows, [state.flowId], flow);
    },

    UPDATE_serversAPI: (state, serverAPI) => {},

    UPDATE_websocketsAPI: (state, { serverId, socket }) => {
        state.websocketsAPI = _.set(state.websocketsAPI, [serverId], socket);
    }
};

const MESSAGE_ECHO = 0;
const MESSAGE_GET_BLOCKS_ALL = 1;
const MESSAGE_GET_BLOCK = 2;
const MESSAGE_RUN_MODULE = 3;

let ws_response_solver = function({ event, serverId, socket }) {
    console.log(event);
};

let actions = {
    WS_UPDATE_BLOCKS_FROM_APIS: ({ state }) => {
        console.log(state.websocketsAPI);
        _.forEach(state.websocketsAPI, server => {
            console.log(server);
            server.send({
                type: MESSAGE_GET_BLOCKS_ALL
            });
        });
    },
    CREATE_WEBSOCKETS_APIS: ({ state, commit }) => {
        _.forEach(state.serversAPI, server => {
            if (!_.isObject(server) || !_.get(server, "id", false) || !_.get(server, "host", false)) {
                return;
            }

            let socket = new WebSocket("ws://" + server.host);

            socket.onopen = function() {
                commit("UPDATE_websocketsAPI", {
                    serverId: server.id,
                    socket: socket
                });
            };

            socket.onclose = function(event) {
                delete state.websocketsAPI[server.id];
            };

            socket.onmessage = function(event) {
                ws_response_solver({
                    event: event,
                    serverId: server.id,
                    socket: socket
                });
            };

            socket.onerror = function(error) {
                console.log("Error " + error.message);
            };
        });
    }
};

let getters = {};

let hooks = {
    __init__: ({ state, store, moduleName }) => {
        // TODO: remove initFlows
        let flows = lstore.get("flows") || initFlows;
        store.commit("base/SET_flows", flows);

        // TODO: remove initFlowId
        let flowId = lstore.get("flowId") || initFlowId;
        store.commit("base/SET_flowId", flowId);

        // TODO: remove serversAPI
        let serversAPI = lstore.get("serversAPI") || initServersAPI;
        store.commit("base/SET_serversAPI", serversAPI);
        store.dispatch("base/WS_UPDATE_BLOCKS_FROM_APIS");

        let blocksPositions = lstore.get("blocksPositions") || {};
        store.commit("base/SET_blocksPositions", blocksPositions);

        let flowPositions = lstore.get("flowPositions") || {};
        store.commit("base/SET_flowPositions", flowPositions);

        let flowZooms = lstore.get("flowZooms") || {};
        store.commit("base/SET_flowZooms", flowZooms);

        // Set data into working flow base
        let currFlow = _.get(flows, [flowId], {});
        store.commit("flow/SET_flow", currFlow);
        let currPositions = _.get(blocksPositions, [flowId], {});
        store.commit("flow/SET_blocksPositions", currPositions);
        let currFlowPositions = _.get(flowPositions, [flowId], { x: 0, y: 0 });
        store.commit("flow/SET_flowPosition", currFlowPositions);
        let currFlowZooms = _.get(flowZooms, [flowId], 1);
        store.commit("flow/SET_flowZoom", currFlowZooms);
    },

    "SET_serversAPI, UPDATE_serversAPI": ({ state, store }) => {
        lstore.set("serversAPI", state.serversAPI);
        store.dispatch("base/CREATE_WEBSOCKETS_APIS");
    },

    "SET_websocketsAPI, UPDATE_websocketsAPI": ({ state, store }) => {
        store.dispatch("base/WS_UPDATE_BLOCKS_FROM_APIS");
    },

    "SET_flows, UPDATE_flows": ({ state }) => {
        lstore.set("flows", state.flows);
    },

    SET_flowId: ({ state }) => {
        lstore.set("flowId", state.flowId);
    },

    "SET_blocksPositions, UPDATE_blocksPositions": ({ state }) => {
        lstore.set("blocksPositions", state.blocksPositions);
    },

    UPDATE_flowPosition: ({ state }) => {
        lstore.set("flowPositions", state.flowPositions);
    },

    UPDATE_flowZooms: ({ state }) => {
        lstore.set("flowZooms", state.flowZooms);
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