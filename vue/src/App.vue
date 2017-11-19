<template lang="pug">
    #app
        flow
        left-panel(v-if="isShowLeftPanel")
        info-panel(v-if="isShowRightPanel")
</template>

<script>
import Flow from "./components/FlowChart/Flow";
import LeftPanel from "./components/LeftPanel";
import InfoPanel from "./components/InfoPanel";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "app",
    components: { Flow, LeftPanel, InfoPanel },
    computed: {
        ...mapState({
            isShowLeftPanel: state => state.panels.isShowLeftPanel,
            isShowRightPanel: state => state.panels.isShowRightPanel
        })
    }
};
</script>

<style lang="stylus">
html, body, #app
    height 100%
</style>
