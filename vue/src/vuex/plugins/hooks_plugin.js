/*
    hooks = {
        mutation: ({ state, moduleName, stateGlobal, payload, mutation, store }) => {}
        "mutation1, mutation2": () => {},
        mutation3: [function1, function2]
    }
*/

const modulesHooks = store => {
    // Hooks from all modules
    // {... "module/__mutation": [function1, function2] }
    let hooks = {};

    // {
    // module1: {... module1hooks},
    // module2: {... module2hooks}
    // }
    let hooksRaw = _.mapValues(store._modules.root._rawModule.modules, val => val.hooks);
    _.forEach(hooksRaw, (base, baseName) => {
        _.forEach(base, (watcherFunc, watcherKey) => {
            // Combined mutation like "first_mutation, anoter_mut"
            let keys = watcherKey.includes(",") ? watcherKey.split(/,\s?/) : [watcherKey];
            keys.forEach(key => {
                let mutationName = baseName + "/" + key;
                if (_.get(hooks, [mutationName])) {
                    hooks[mutationName] = _.concat(hooks[mutationName], watcherFunc);
                } else {
                    hooks[mutationName] = _.concat(watcherFunc);
                }
            });
        });
    });

    store.subscribe((mutation, state) => {
        // called after every mutation.
        // hooks - array of functions associated with mutationName
        _.mapKeys(hooks, (hooks, mutationName) => {
            if (mutationName == mutation.type) {
                let moduleName = mutationName.split("/")[0];
                hooks.forEach(hookFunc => {
                    hookFunc({
                        state: state[moduleName],
                        moduleName: moduleName,
                        stateGlobal: state,
                        payload: mutation.payload,
                        mutation: mutation.type,
                        store: store
                    });
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