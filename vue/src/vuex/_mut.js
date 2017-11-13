import _ from "lodash";

export default stateObj =>
    Object.assign({},
        ..._.map(stateObj, (data, key) => {
            return {
                ["SET_" + key]: function(state, val) {
                    state[key] = val;
                }
            };
        })
    );