<template lang="pug">
    div
        #left-panel-switcher
            i.icon.sidebar.big(@click="selectSubPanel('main')")
            i.icon.setting.big(@click="selectSubPanel('settings')")
            i.icon.window.close.big.right(
                @click="closePanel"
                v-if="isShowLeftPanel"
            )

</template>

<script>
import { mapState } from "vuex";

export default {
    name: "left-panel-switcher",
    methods: {
        selectSubPanel: function(type) {
            this.$store.commit("panels/__set_isShowLeftPanel", true);
            this.$store.commit("panels/__set_leftSubPanel", type);
        },
        closePanel: function() {
            this.$store.commit("panels/__set_isShowLeftPanel", false);
        }
    },
    computed: {
        ...mapState({
            isShowLeftPanel: state => state.panels.isShowLeftPanel
        })
    }
};
</script>

<style lang="stylus" scoped>
#left-panel-switcher
    position absolute
    left 5px
    top 5px
    z-index 1000

.right
    margin-left 130px
</style>
