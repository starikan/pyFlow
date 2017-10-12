import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    count: 0,
    currFlow: "test_flow",
    selectedBlock: "operator",
    flows: {
      test_flow: {
        operators: {
          operator1: {
            top: 20,
            left: 20,
            properties: {
              title: "Operator 1",
              inputs: {},
              outputs: {
                output_1: {
                  label: "Output 1"
                }
              }
            }
          },
          operator2: {
            top: 80,
            left: 300,
            properties: {
              title: "Operator 2",
              inputs: {
                input_1: {
                  label: "Input 1"
                },
                input_2: {
                  label: "Input 2"
                }
              },
              outputs: {}
            }
          }
        },
        links: {
          link_1: {
            fromOperator: "operator1",
            fromConnector: "output_1",
            toOperator: "operator2",
            toConnector: "input_2"
          }
        }
      }
    }
  },
  mutations: {
    setBlockPosition(state, position) {
      let currFlow = state.currFlow;
      let currFlowData = state.getters.currFlowData;
      let selectedBlock = state.selectedBlock;

      let currTop = currFlowData.operators[selectedBlock].top;
      let currLeft = currFlowData.operators[selectedBlock].left;

      let newTop = position.top ? position.top : currTop;
      let newLeft = position.left ? position.left : currLeft;

      state.flows[currFlow][selectedBlock].top = newTop;
      state.flows[currFlow][selectedBlock].left = newLeft;
    },
    selectBlock: (state, blockId) => {
      state.selectedBlock = blockId ? blockId : state.selectedBlock;
    },
    unSelectBlock: state => {
      state.selectedBlock = null;
    }
  },
  actions: {
    increment({ commit }) {
      setTimeout(() => {
        commit("increment");
      }, 2000);
    }
  },
  getters: {
    currFlowData: state => state.flows[state.currFlow]
  }
});

export default store;
