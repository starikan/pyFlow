// import $ from "jquery";
window.$ = window.jQuery = global.$ = global.jQuery = $ = require("jquery");

import "jquery-ui";
import "jquery.flowchart/jquery.flowchart.js";
import "jquery.flowchart/jquery.flowchart.css";

// require("jquery-ui");
// require("jquery.flowchart/jquery.flowchart.js");
// require("jquery.flowchart/jquery.flowchart.css");

require("semantic-ui-css/semantic.css");
require("semantic-ui-css/semantic.js");

// import * from "jquery.flowchart";

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
