import $ from "jquery";
window.$ = window.jQuery = global.$ = global.jQuery = $;

import "semantic-ui-css/semantic.css";
import "semantic-ui-css/semantic.js";

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
// import router from "./router";

Vue.config.productionTip = false;

import store from "./vuex/store";

/* eslint-disable no-new */
new Vue({
    el: "#app",
    // router,
    store,
    template: "<App/>",
    components: { App }
});