const modulesHooks = store => {
    // Hooks from all modules
    let hooks = {};
    let hooksRaw = _.mapValues(store._modules.root._rawModule.modules, val => val.hooks);
    _.forEach(hooksRaw, (base, baseName) => {
        _.forEach(base, (val, key) => {
            // Combined mutation
            if (key.includes(",")) {
                _.forEach(key.split(/,\s?/), keySplited => {
                    _.set(hooks, [baseName + "/" + keySplited], val);
                });
            } else {
                _.set(hooks, [baseName + "/" + key], val);
            }
        });
    });

    store.subscribe((mutation, state) => {
        // called after every mutation.
        _.mapKeys(hooks, (hook, mut) => {
            if (mut == mutation.type) {
                let moduleName = mut.split("/")[0];
                hook({
                    state: state[moduleName],
                    moduleName: moduleName,
                    stateGlobal: state,
                    payload: mutation.payload,
                    mutation: mutation.type,
                    store: store
                });
            }
        });
    });

    // Initial hooks start
    _.forEach(store._modulesNamespaceMap, (val, key) => {
        let init = key + "__init__";
        if (_.get(store._mutations, init)) {
            store.commit(init);
        }
    });
};

export default modulesHooks;