<template lang="pug">
    div#left-panel-switcher(@click="click($event)")
        i.icon.sidebar.big
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "left-panel-switcher",
    methods: {
        click: function(evt) {
            this.$store.commit("panels/__set_isShowLeftPanel", true);
        }
    }
};
</script>

<style lang="stylus" scoped>
#left-panel-switcher
    position absolute
    left 5px
    top 5px
    z-index 1000
</style>
