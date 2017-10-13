<template>
  <div id="app">

    <flow></flow>
    <!-- <zoom-image></zoom-image> -->
    <left-panel></left-panel>
    <!-- <info-panel></info-panel> -->
  </div>

  <!-- <router-view></router-view> -->
  </div>
</template>

<script>

import Flow from "./components/Flow";
import LeftPanel from "./components/LeftPanel";

export default {
  name: 'app',
  components: { Flow, LeftPanel }
}
</script>

<style>
html,
body,
#app {
  height: 100%;
}
</style>
