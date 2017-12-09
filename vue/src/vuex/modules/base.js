/*
    Base is data that sync with externals. It`s not live data from flow.
*/

import lstore from "store";
import axios from "axios";

import _mut from "../_mut";

import { initFlows, blocksCollection, initFlowId, initServersAPI } from "../init_data";

import Sockets from "../sockets";

let state = {
    flows: {},
    flowId: "",
    flowPositions: {},
    flowZooms: {},
    blocksBootstrap: {},
    blocksPositions: {},
    serversAPI: {}
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

    UPDATE_blocksBootstrap: (state, { newBlocks, serverId }) => {
        console.log(newBlocks, serverId);

        let newValues = {
            [serverId]: newBlocks
        };

        state.blocksBootstrap = {...state.blocksBootstrap, ...newValues };
        console.log(state.blocksBootstrap);
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
    UPDATE_BLOCKS_FROM_APIS: ({ state, commit }) => {
        _.forEach(state.serversAPI, (server, serverId) => {
            axios
                .get("http://" + server.host + "/all_blocks")
                .then(response => {
                    commit("UPDATE_blocksBootstrap", {
                        newBlocks: response.data,
                        serverId: serverId
                    });
                })
                .catch(error => console.log(error));
        });
    },
    CREATE_WEBSOCKETS_APIS: ({ state, commit }) => {
        _.forEach(state.serversAPI, server => {
            Sockets.addSocket({
                id: server.id,
                host: server.host
            });
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
        store.dispatch("base/UPDATE_BLOCKS_FROM_APIS");
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
    hooks: hooks,
    debug: true
};