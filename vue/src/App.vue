<template>
  <div id="app">

    <flow></flow>
    <!-- <zoom-image></zoom-image> -->
    <div class="ui grid">
      <div class="four columns row">
        <div class="left floated column">
          <left-panel></left-panel>
        </div>
        <div class="right floated column">
          <!-- <info-panel></info-panel> -->
        </div>
      </div>
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
