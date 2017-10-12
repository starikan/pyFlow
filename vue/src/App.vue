<template>
  <div id="app">
    <flow></flow>
    <!-- <left-panel></left-panel>
      <info-panel></info-panel>
      <zoom-image></zoom-image> -->
    <!-- <img src="./assets/logo.png"> -->
    <!-- <hello></hello> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>

import Flow from "./components/Flow";

export default {
  name: 'app',
  components: { Flow }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
