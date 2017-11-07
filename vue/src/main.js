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

import VModal from "vue-js-modal";
Vue.use(VModal);

import VueRx from 'vue-rx'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription' // Disposable if using RxJS4
import { Subject } from 'rxjs/Subject' // required for domStreams option

Vue.use(VueRx, {
    Observable,
    Subscription,
    Subject
})

/* eslint-disable no-new */
new Vue({
    el: "#app",
    // router,
    store,
    template: "<App/>",
    components: { App }
});