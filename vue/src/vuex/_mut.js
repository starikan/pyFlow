import _ from "lodash";

export default stateObj =>
    Object.assign({
            __init__: function(state, val) {}
        },
        ..._.map(stateObj, (data, key) => {
            return {
                ["__set_" + key]: function(state, val) {
                    state[key] = val;
                }
            };
        })
    );