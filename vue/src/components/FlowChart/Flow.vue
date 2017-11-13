<template lang="pug">
    #flow(
        @dblclick.stop="dblclick($event)"
        @mousemove="mousemove($event)" 
        @mouseup.stop="mouseup($event)"
        @mousedown.stop="mousedown($event)"
        )

        .link: svg: links(
            v-for="(link, link_id) in linksCurr" 
            :key="link_id" 
            :link="link"
            :link-id="link_id")

        fb-block.fb(
            :style="block_style(block_id)"
            v-for="(block, block_id) in flow.blocks" 
            :key="block_id" 
            :class="[{'select': blockSelect == block_id}]"
            
            @mousedown.stop.native="blockSelect = block_id" 
            @dblclick.stop.native="fb_dblclick($event)"
            
            :block="block"
            :block_id="block_id")

        link-temp
</template>

<script>
import _ from "lodash";
import { mapState, mapGetters } from "vuex";

import Block from "./Block";
import Links from "./Links";
import LinkTemp from "./LinkTemp";

export default {
    name: "flow",
    components: { links: Links, "link-temp": LinkTemp, "fb-block": Block },
    data: function() {
        return {
            blockSelect: null
        };
    },
    mounted() {
        /*
            Get initial data on startup
        */
        this.$store.dispatch("base/loadAllData");
        this.$store.commit("flow/SET_flow", this.flowBase);
        this.$store.commit("flow/SET_positions", this.positionsBase);
    },
    computed: {
        ...mapGetters({
            flowBase: "base/flow",
            positionsBase: "base/positions"
        }),
        ...mapState({
            flow: state => state.flow.flow,
            positions: state => state.flow.positions,
            draggingBlock: state => state.flow.draggingBlock
        }),
        transform_matrix: function() {
            return _.mapValues(this.positions, val => `matrix(1, 0, 0, 1, ${val.x}, ${val.y})`);
        },
        infoPanelShow: function() {
            return this.$store["oldStore/infoPanelShow"];
        },
        linksCurr: function() {
            return this.$store.getters["oldStore/linksCurr"];
        }
    },
    methods: {
        fb_dblclick: function(evt) {
            console.log("fb_dblclick", evt);
            this.$store.commit("oldStore/toggleLeftPanel", { show: true });
        },
        dblclick: function(data, evt) {
            console.log("flow_dblclick", evt, data, this.$modal);
        },
        mousedown: function(evt) {
            this.blockSelect = null;
        },
        mousemove: function(evt) {
            // Move block
            if (this.draggingBlock) {
                this.$store.commit("flow/UPDATE_BLOCK_POSITION", {
                    [this.draggingBlock.block_id]: {
                        x: evt.pageX - this.draggingBlock.offcetX,
                        y: evt.pageY - this.draggingBlock.offcetY
                    }
                });
            }

            // Temp link move
            if (this.linkTempFlag) {
                this.linkTempEndCoords = { x: evt.clientX, y: evt.clientY };
            }
        },

        mouseup: function(evt) {
            // End of dragging
            this.$store.dispatch("base/saveData");
            this.$store.commit("flow/SET_draggingBlock", null);
        },
        block_style: function(block_id) {
            return {
                transform: _.get(this.transform_matrix, [block_id]),
                "z-index": block_id == this.blockSelect ? 100 : 0
            };
        }
    }
};
</script>

<style scoped lang="stylus">
#flow
    width 100%
    height 100%
    background-image url('/static/background.jpg')
    position absolute
    font-family 'Open Sans Condensed', sans-serif
    user-select none

.fb
    position absolute
    border 1px solid black
    background-color rgba(255, 255, 255, 0.5)

    &.select
        border 1px solid red

.link, svg
    width 100%
    height 100%
    position absolute
</style>
