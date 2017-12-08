<template lang="pug">
    #leftpanel
        .subpanel(v-if="leftSubPanel == 'main'")
            #lp_main_flows
                h3 Flows
                h4 {{flow.name}}
                .ui.buttons
                    button.ui.button(@click="saveFlow") Save
                    button.ui.button Load
                    button.ui.button New
                button.ui.button(@click="centerFlow") Center Flow

            #lp_main_links
                h3 Links
                .ui.buttons
                    button.ui.button Delete
                    button.ui.button Edit

            #lp_main_blocks
                h3 Blocks
                button.ui.button(
                    @click="deleteSelectedBlock()"
                    ) Delete Selected Block
                br
                .server-api-block(v-for="blocks, serverID in blocksBootstrap")
                    h2 {{serverID}}
                    button.ui.button.tiny(
                        v-for="blocks in blocks"
                        @click="addBlock(block)"
                        ) {{block.id}}


        .subpanel(v-if="leftSubPanel == 'settings'")
            #lp_settings_flow
                h3 Flows
                .ui.checkbox
                    input(
                        type="checkbox"
                        v-model="saveOnEditToBase")
                    label Autosave Flows on Edit
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
    name: "left-panel",
    computed: {
        ...mapState({
            flows: state => state.base.flows,
            blocksBootstrap: state => state.base.blocksBootstrap,
            flow: state => state.flow.flow,
            flowZoom: state => state.flow.flowZoom,
            flowPosition: state => state.flow.flowPosition,
            blocksPositions: state => state.flow.blocksPositions,
            blocksSizes: state => state.flow.blocksSizes,
            blockSelected: state => state.flow.blockSelected,
            flowSize: state => state.settings.settingsFlow.flowSize,
            leftSubPanel: state => state.panels.leftSubPanel
        }),
        saveOnEditToBase: {
            get: function() {
                return this.$store.state.settings.settingsFlow.saveOnEditToBase;
            },
            set: function(newValue) {
                console.log(newValue);
                this.$store.commit({
                    type: "settings/SET_settingsFlow",
                    path: "saveOnEditToBase",
                    value: newValue
                });
            }
        }
    },
    methods: {
        saveFlow: function() {
            this.$store.commit("base/UPDATE_flows", this.flow);
        },
        // TODO
        centerFlow: function() {
            this.$bus.$emit("recalcBlocksSizes");
            this.$store.dispatch("flow/centerFlow");
        },
        addBlock: function(block) {
            this.$store.commit("flow/CREATE_BLOCK_flow", { block: block });
        },
        deleteSelectedBlock: function() {
            // TODO: Confirm
            this.$store.commit("flow/DELETE_BLOCK_flow", this.blockSelected);
        }
    }
};
</script>

<style lang="stylus" scoped>
#leftpanel
    height 100%
    width 250px
    position absolute
    top 0px
    left 0px
    background-color rgba(127, 127, 127, 0.8)
    padding-top 30px

    h3
        background-color rgba(80, 80, 80, 1)

    h3, h4
        text-align center
        margin 10px 0px 10px 0px
</style>
