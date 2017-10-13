<template>
  <div id="app">

    <flow></flow>
    <left-panel></left-panel>
    <!-- <info-panel></info-panel> -->
    <!-- <zoom-image></zoom-image> -->

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
