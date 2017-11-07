<template lang="pug">
    #flow(
        @mousemove.stop="flow_mousemove(blockDraggedId, $event)" 
        @mouseup.stop="flow_mouseup($event)"
        @dblclick.stop="flow_dblclick($event)"
        @click.stop="flow_click($event)"
    )

        link-temp( 
            :x1="linkTempStartCoords.x"
            :y1="linkTempStartCoords.y"
            :x2="linkTempEndCoords.x"
            :y2="linkTempEndCoords.y"
        )

        .link: svg: links(
            v-for="(link, link_id) in linksCurr" 
            :key="link_id" 
            :link="link"
            :link-id="link_id"
        )

        .fb(
            v-for="(block, block_id) in flowCurr.blocks" 
            :key="block_id" 
            @click.stop="fb_click(block_id)" 
            v-stream:click="{subject: fb_click$, data: block_id}" 
            @dblclick.stop="fb_dblclick($event)"
            :style="{transform: blocks_pos_style[block_id], 'z-index': block_id == blockSelectedId ? 1000 : 0}"
            :class="[{'select': block_id == blockSelectedId}]"
        )

            table.fb-title(
                @mousedown.stop="title_mousedown(block_id, $event)"
            )
                tbody: tr
                    td {{block.title}}
                    td: .flow-block-title-buttons

            table.fb-main
                tbody: tr
                    td: table: tbody
                        block-dot.fb-inputs(
                            v-for="input in block.inputs" 
                            :key="input.id" 
                            :data="input" 
                            :block-id="block_id"
                            @linkStart="linkStart"
                            @linkEnd="linkEnd"
                        )
                    td: table: tbody
                        block-dot.fb-outputs(
                            v-for="output in block.outputs" 
                            :key="output.id" 
                            :data="output" 
                            :block-id="block_id"
                            @linkStart="linkStart"
                            @linkEnd="linkEnd"
                        )

            .flow-block-image
            .flow-block-extend

</template>

<script>
import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/map";
import "rxjs/add/observable/fromEvent";

import BlockDot from "./BlockDot";
import Links from "./Links";
import LinkTemp from "./LinkTemp";

export default {
    subscriptions() {
        this.fb_click$ = new Subject().map(raw => raw.data);
        return {
            mouse_x: this.fb_click$
        };
    },
    data: function() {
        return {
            // blockSelectedId: null,
            blockDraggedId: null,
            blockOffsetX: 0,
            blockOffsetY: 0,

            linkTempFlag: false,
            linkTempData: {},
            linkTempStartCoords: { x: 0, y: 0 },
            linkTempEndCoords: { x: 0, y: 0 }
        };
    },
    components: { BlockDot, Links, LinkTemp },
    name: "flow",
    mounted() {
        // Get initial positions
        this.getPositions();
    },
    computed: {
        blocks_pos_style: function() {
            return _.mapValues(this.blocksPositions, val => `matrix(${val})`);
        },
        ...mapState(["flow", "infoPanelShow", "blockSelectedId"]),
        ...mapGetters(["flowCurr", "blocksPositions", "linksCurr"])
    },
    methods: {
        ...mapMutations([
            "updatePosition",
            "addLink",
            "selectBlock",
            "toggleLeftPanel"
        ]),
        ...mapActions(["savePositions", "getPositions"]),
        fb_click: function(block_id) {
            this.selectBlock({ block_id: block_id });
        },
        fb_dblclick: function(evt) {
            console.log("fb_dblclick", evt);
            this.toggleLeftPanel({ show: true });
        },
        flow_click: function(evt) {
            this.selectBlock({ block_id: null });
            console.log("flow_click", evt);
        },
        flow_dblclick: function(evt) {
            console.log("flow_dblclick", evt, this.$modal);
        },
        // Click on title to move block
        title_mousedown: function(block_id, evt) {
            this.blockDraggedId = block_id;
            this.selectBlock({ block_id: block_id });

            this.blockOffsetX = evt.offsetX;
            this.blockOffsetY = evt.offsetY;
        },
        flow_mousemove: function(block_id, evt) {
            // Move block, but get event on all flow
            if (block_id) {
                this.updatePosition({
                    block_id: block_id,
                    panX: evt.pageX - this.blockOffsetX,
                    panY: evt.pageY - this.blockOffsetY
                });
            }
            // Temp link move
            if (this.linkTempFlag) {
                this.linkTempEndCoords = { x: evt.clientX, y: evt.clientY };
            }
            return false;
        },
        // End of dragging
        flow_mouseup: function(evt) {
            this.blockDraggedId = null;
            this.savePositions();

            this.linkTempFlag = false;
            this.linkTempData = {};
            this.linkTempStartCoords = { x: 0, y: 0 };
            this.linkTempEndCoords = { x: 0, y: 0 };
        },
        linkStart: function(evt) {
            // console.log(evt);
            this.linkTempFlag = true;
            this.linkTempData = evt;
            this.linkTempStartCoords = evt.coords;
            this.linkTempEndCoords = evt.coords;
        },
        linkEnd: function(evt) {
            this.addLink({
                dot0: {
                    dot_id: evt.data.id,
                    dot_type: evt.data.type,
                    block_id: evt.block_id
                },
                dot1: {
                    dot_id: this.linkTempData.data.id,
                    dot_type: this.linkTempData.data.type,
                    block_id: this.linkTempData.block_id
                }
            });

            this.linkTempFlag = false;
            this.linkTempData = {};
            this.linkTempStartCoords = { x: 0, y: 0 };
            this.linkTempEndCoords = { x: 0, y: 0 };
        }
    },
    watch: {}
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

.fb-title
    font-size 28px
    padding 5px
    width 100%
    cursor move

.fb-main
    padding 5px
    width 100%
    background-color rgba(127, 127, 127, 0.5)

.fb-main td
    vertical-align top

.fb-outputs
    text-align right

.link, svg
    width 100%
    height 100%
    position absolute
</style>
