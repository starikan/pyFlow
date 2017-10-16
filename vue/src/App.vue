<template>
  <div id="app">

    <flow></flow>
    <!-- <zoom-image></zoom-image> -->
    <left-panel></left-panel>
    <info-panel v-if="selectedBlock"></info-panel>
  </div>

  <!-- <router-view></router-view> -->
  </div>
</template>

<script>

import Flow from "./components/Flow";
import LeftPanel from "./components/LeftPanel";
import InfoPanel from "./components/InfoPanel";

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'app',
  components: { Flow, LeftPanel, InfoPanel },
  computed: {
    ...mapState(['selectedBlock'])
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
