import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    count: 0,
    currFLow: "test_flow",
    flows: {
      test_flow: {
        operators: {
          operator: {
            top: 20,
            left: 20,
            properties: {
              title: "Operator",
              inputs: {
                input_1: {
                  label: "Input 1"
                },
                input_2: {
                  label: "Input 2"
                }
              },
              outputs: {
                output_1: {
                  label: "Output 1"
                },
                output_2: {
                  label: "Output 2"
                },
                output_3: {
                  label: "Output 3"
                }
              }
            }
          }
        }
      }
    }
  },
  mutations: {
    increment(state) {
      state.count++;
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
    countPlus10: state => state.count + 10,
    currFlowData: state => state.flows[state.currFLow]
  }
});

export default store;
