<template lang="pug">
    #leftpanel
        .ui.container
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
    name: "left-panel"
};
</script>

<style lang="stylus" scoped>
#leftpanel
    height 100%
    width 150px
    position absolute
    top 0px
    left 0px
    background-color #ffff99
</style>
