<template lang="pug">
    #infopanel
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "info-panel",
    computed: {
        // ...mapState()
    }
};
</script>

<style lang="stylus" scoped>
#infopanel
    position absolute
    top 0px
    right 0px
    height 100%
    width 250px
    background-color rgba(127, 127, 127, 0.8)
    padding-top 30px
</style>
