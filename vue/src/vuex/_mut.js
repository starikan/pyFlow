import _ from "lodash";

/*
    commit("SET_someValInStore", value) - Simple data rewrite
    commit({
        type: "SET_someValInStore",
        path: "some.path.in.object.without.root" || ["some, "path, ...],
        value: value
    })

    Naming:
        - SET_value - autogenerate setter for all values in state
        - SOMEACTION_value - mutate value in state (UPDATE_flow)
        - SOMEACTION_SOMEPART_value - mutate part of value (UPDATE_LINK_flow)

*/

export default stateObj =>
    Object.assign({
            __init__: function(state, val) {}
        },
        ..._.map(stateObj, (data, key) => {
            return {
                ["SET_" + key]: function(state, val) {
                    if (_.isObject(val) && !_.isUndefined(val.path) && !_.isUndefined(val.value)) {
                        _.set(state[key], val.path, val.value);
                    } else {
                        state[key] = val;
                    }
                }
            };
        })
    );