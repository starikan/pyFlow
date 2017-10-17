<template>
  <div id="app">

    <flow></flow>
    <!-- <zoom-image></zoom-image> -->
    <left-panel v-if="leftPanel.isShow"></left-panel>
    <info-panel v-if="infoPanel.isShow"></info-panel>
  </div>

  <!-- <router-view></router-view> -->
  </div>
</template>

<script>

import Flow from "./components/FlowChart/Flow";
import LeftPanel from "./components/LeftPanel";
import InfoPanel from "./components/InfoPanel";

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'app',
  components: { Flow, LeftPanel, InfoPanel },
  computed: {
    ...mapState(['infoPanel', "leftPanel"])
  },
}
</script>

<style>
html,
body,
#app {
  height: 100%;
}
</style>
