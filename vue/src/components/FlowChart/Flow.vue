<template lang="pug">

    #flow(
        @mousewheel="mousewheel($event)"
        @wheel="mousewheel($event)"
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
            translate_origin: { x: 0, y: 0 }
        };
    },
    computed: {
        ...mapState({
            flow: state => state.flow.flow,
            positions: state => state.flow.positions,
            links: state => state.flow.flow.links,
            draggingBlock: state => state.flow.draggingBlock,
            flowZoom: state => state.flow.flowZoom,
            flowPosition: state => state.flow.flowPosition
        }),
        blocks_transform: function() {
            return _.mapValues(this.positions, val => `matrix(1, 0, 0, 1, ${val.x}, ${val.y})`);
        },
        elements_style: function() {
            return {
                // transform: `matrix(${this.flowZoom}, 0, 0, ${this.flowZoom}, 0, 0)`
            };
        },
        flow_style: function() {
            return {
                transform: `matrix(${this.flowZoom}, 0, 0, ${this.flowZoom}, ${this.flowPosition.x}, ${this.flowPosition
                    .y})`,
                "transform-origin": `${this.translate_origin.x}px ${this.translate_origin.y}px`
            };
        }
    },
    methods: {
        mousewheel: function(evt) {
            const { clientX, clientY } = evt;

            this.translate_origin = {
                x: clientX - this.flowPosition.x,
                y: clientY - this.flowPosition.y
            };

            let deltaZ = evt.deltaY < 0 ? 0.1 : -0.1;
            this.$store.commit("flow/ZOOM", { delta: deltaZ });
        },
        fb_dblclick: function(evt) {
            this.$store.commit("panels/__set_isShowRightPanel", true);
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
                this.$store.commit("flow/UPDATE_flowPosition", { deltaX: evt.movementX, deltaY: evt.movementY });
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
            this.$store.commit("flow/__set_draggingBlock", null);
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
size = 1000px

#flow
    position absolute
    width size
    height size
    top 0px
    left 0px
    background-image url('/static/background.jpg')
    font-family 'Open Sans Condensed', sans-serif
    user-select none
    // transform-origin 0 0

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
