const modulesHooks = store => {
    _.forEach(store._modulesNamespaceMap, (val, key) => {
        let init = key + "INIT";
        if (_.get(store._mutations, init)) {
            store.commit(init);
        }
    });

    let hooks = _(store._modules.root._rawModule.modules)
        .mapValues(val => val.hooks)
        .map((val, key) => _.mapKeys(val, (_val, _key) => key + "/" + _key))
        .filter(val => !_.isEmpty(val))
        .reduce((result, value, key) => {
            return {...result, ...value };
        });

    store.subscribe((mutation, state) => {
        // called after every mutation.
        _.mapKeys(hooks, (hook, mut) => {
            if (mut == mutation.type) {
                let moduleName = mut.split("/")[0];
                hook({
                    state: state[moduleName],
                    stateGlobal: state,
                    payload: mutation.payload,
                    mutation: mutation.type,
                    store: store
                });
            }
        });
    });
};

export default modulesHooks;