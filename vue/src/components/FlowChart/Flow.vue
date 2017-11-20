<template lang="pug">

    #flow(
        @mousewheel="mousewheel($event)"
        @dblclick.stop="dblclick($event)"
        @mousemove="mousemove($event)" 
        @mouseup="mouseup($event)"
        @mousedown="mousedown($event)"
        
        :style="flow_style")

        #elements(:style="elements_style")

            .link: svg: linkConnector(
                v-for="(link, link_id) in links" 
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
import Link from "./Link";
import LinkTemp from "./LinkTemp";

export default {
    name: "flow",
    components: { linkConnector: Link, "link-temp": LinkTemp, "fb-block": Block },
    data: function() {
        return {
            blockSelect: null,
            flowDragg: false,
            flowPosition: {
                x: 0,
                y: 0
            }
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
            links: state => state.flow.flow.links,
            draggingBlock: state => state.flow.draggingBlock,
            flowZoom: state => state.flow.flowZoom
        }),
        blocks_transform: function() {
            return _.mapValues(this.positions, val => `matrix(1, 0, 0, 1, ${val.x}, ${val.y})`);
        },
        elements_style: function() {
            return {
                transform: `matrix(${this.flowZoom}, 0, 0, ${this.flowZoom}, 0, 0)`
            };
        },
        flow_style: function() {
            return {
                transform: `matrix(1, 0, 0, 1, ${this.flowPosition.x}, ${this.flowPosition.y})`
            };
        }
    },
    methods: {
        mousewheel: function(evt) {
            if (evt.deltaY < 0) {
                this.$store.commit("flow/ZOOM_IN");
            } else {
                this.$store.commit("flow/ZOOM_OUT");
            }
        },
        fb_dblclick: function(evt) {
            this.$store.commit("panels/SET_isShowRightPanel", true);
        },
        dblclick: function(data, evt) {
            console.log("flow_dblclick", evt, data, this.$modal);
        },
        mousedown: function(evt) {
            this.blockSelect = null;
            this.flowDragg = true;
        },
        mousemove: function(evt) {
            // Move Flow
            if (this.flowDragg) {
                // console.log(evt);
                this.flowPosition.x += evt.movementX;
                this.flowPosition.y += evt.movementY;
            }

            // Move block
            if (this.draggingBlock) {
                this.$store.commit("flow/UPDATE_BLOCK_POSITION", {
                    block_id: this.draggingBlock,
                    delta: {
                        x: evt.movementX / this.flowZoom,
                        y: evt.movementY / this.flowZoom
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
            this.flowDragg = false;
        },
        block_style: function(block_id) {
            return {
                transform: _.get(this.blocks_transform, [block_id]),
                "z-index": block_id == this.blockSelect ? 100 : 0
            };
        }
    }
};
</script>

<style scoped lang="stylus">
#flow
    position absolute
    width 10000px
    height 10000px
    top -5000px
    left -5000px
    background-image url('/static/background.jpg')
    font-family 'Open Sans Condensed', sans-serif
    user-select none

.fb
    position absolute
    border 1px solid black
    background-color rgba(255, 255, 255, 0.5)

    &.select
        border 1px solid red

.link, svg, #elements
    width 100%
    height 100%
    position absolute
</style>
