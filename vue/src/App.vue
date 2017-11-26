<template lang="pug">
    #app
        flow
        left-panel(v-if="isShowLeftPanel")
        info-panel(v-if="isShowInfoPanel")
        left-panel-switcher

</template>

<script>
import Flow from "./components/FlowChart/Flow";
import LeftPanel from "./components/Panels/LeftPanel";
import LeftPanelSwitcher from "./components/Panels/LeftPanelSwitcher";
import InfoPanel from "./components/Panels/InfoPanel";

import { mapState } from "vuex";

export default {
    name: "app",
    components: { Flow, LeftPanel, InfoPanel, LeftPanelSwitcher },
    computed: {
        ...mapState({
            isShowLeftPanel: state => state.panels.isShowLeftPanel,
            isShowInfoPanel: state => state.panels.isShowInfoPanel
        })
    }
};
</script>

<style lang="stylus">
html, body, #app
    height 100%
    overflow hidden
</style>
