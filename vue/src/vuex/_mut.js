import _ from "lodash";

/*
    commit("__set_someValInStore", value) - Simple data rewrite
    commit({
        type: "__set_someValInStore",
        path: "some.path.in.object.without.root",
        value: value
    })
*/

export default stateObj =>
    Object.assign({
            __init__: function(state, val) {}
        },
        ..._.map(stateObj, (data, key) => {
            return {
                ["__set_" + key]: function(state, val) {
                    if (_.isObject(val) && !_.isUndefined(val.path) && !_.isUndefined(val.value)) {
                        _.set(state[key], val.path, val.value);
                    } else {
                        state[key] = val;
                    }
                }
            };
        })
    );