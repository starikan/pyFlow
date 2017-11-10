export default stateObj => {
    return Object.assign({},
        ..._.keys(stateObj).map(key => {
            return {
                ["SET_" + key]: function(state, val) {
                    state[key] = val;
                }
            };
        })
    );
};