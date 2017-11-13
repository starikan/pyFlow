/*
    Base is data that sync with externals. It`s not live data from flow.
*/

import lstore from "store";

import _mut from "../_mut";
import { initFlows, blocksCollection } from "../init_data";

let state = {
    positions: {},
    flowId: "",
    flows: {},
    blocks: {}
};

let mutations = {
    UPDATE_BLOCK_POSITION: (state, coords) => {
        if (!state.positions[state.flowId]) {
            Object.assign(state.positions, {
                [state.flowId]: {}
            });
        }
        Object.assign(state.positions[state.flowId], coords);
    }
};

let actions = {
    // Load all flows and others from external storages and APIs
    loadAllData: ({ state, commit, dispatch, getters }) => {
        // TODO: Get flows from API
        let flows = initFlows;
        commit("SET_flows", flows);

        // TODO: remove "testFlow" when exist selector of flow
        commit("SET_flowId", lstore.get("flowId") || "testFlow");

        // Должно быть {flow_id:{block_id: {x, y}}}
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // let blankPositions = Object.assign({},
        //     ..._.keys(_.get(state.flows, [state.flowId, "blocks"])).map(key => ({
        //         [key]: {
        //             x: 0,
        //             y: 0
        //         }
        //     }))
        // );
        // let positions = Object.assign(blankPositions, lstore.get("positions"));
        let positions = lstore.get("positions") || {};
        commit("SET_positions", positions);
        console.log(state.positions);

        commit("SET_blocks", blocksCollection);
    },

    // TODO: default values
    // saveData: ({ state }, { positions = true, flowId = true, flows = true }) => {
    saveData: ({ state }) => {
        let positions = true;
        let flowId = true;
        let flows = true;
        positions ? lstore.set("positions", state.positions) : "";
        flowId ? lstore.set("flowId", state.flowId) : "";
        flows ? lstore.set("flows", state.flows) : "";
    }

    // UPDATE_BLOCKS_POSITIONS: ({ state, dispatch }, { positions, flowId = state.flowId }) => {
    //     Object.assign(state.blocksPositions, { flowId: positions });
    //     dispatch("SAVE_BLOCKS_POSITIONS");
    // },
};

let getters = {
    // Flow from external source, without current unsaved updates
    flow: state => _.get(state.flows, [state.flowId], {}),
    positions: state => _.get(state.positions, [state.flowId], {})
};

export default {
    namespaced: true,
    state: state,
    mutations: Object.assign(_mut(state), mutations),
    actions: actions,
    getters: getters
};