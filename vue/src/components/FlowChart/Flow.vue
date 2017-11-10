<template lang="pug">
    #flow(
        v-stream:click.stop="{subject: block_select$, data: null}" 
        @mousemove.stop="flow_mousemove(blockDraggedId, $event)" 
        @mouseup.stop="flow_mouseup($event)"
        @dblclick.stop="flow_dblclick($event)"
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
            v-stream:mousedown.stop="{subject: block_select$, data: block_id}" 
            @click.stop=""
            v-for="(block, block_id) in flowCurr.blocks" 
            :key="block_id" 
            @dblclick.stop="fb_dblclick($event)"
            :style="{transform: blocks_pos_style[block_id], 'z-index': block_id == blockSelectedId ? 1000 : 0}"
            :class="[{'select': block_id == blockSelectedId}]"
            )

            table.fb-title(
                @mousedown.stop="title_mousedown(block_id, $event)"
                v-stream:mousedown.stop="{subject: block_select$, data: block_id}" 
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
import { mapState, mapGetters } from "vuex";

import Rx from "rxjs";

import BlockDot from "./BlockDot";
import Links from "./Links";
import LinkTemp from "./LinkTemp";

let block_select$ = new Rx.BehaviorSubject({ data: null })
    .pluck("data")
    .distinctUntilChanged()
    // .do(val => console.log("block_select$", val))
    .share();

export default {
    subscriptions() {
        let streams = {};

        this.block_select$ = block_select$;
        streams.blockSelectedId = block_select$;
        streams.blockSelectedId.subscribe(val => console.log(val));

        return streams;
    },
    data: function() {
        return {
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
        this.$store.dispatch("oldStore/getPositions");
        this.$observables.blockSelectedId.subscribe(val => console.log(val));

        this.$store.dispatch("base/loadAllData");
        this.$store.dispatch("flow/updateCurrentFlow");
    },
    computed: {
        blocks_pos_style: function() {
            return _.mapValues(this.blocksPositions, val => `matrix(${val})`);
        },
        flow: function() {
            return this.$store["oldStore/flow"];
        },
        infoPanelShow: function() {
            return this.$store["oldStore/infoPanelShow"];
        },
        flowCurr: function() {
            return this.$store.getters["oldStore/flowCurr"];
        },
        blocksPositions: function() {
            return this.$store.getters["oldStore/blocksPositions"];
        },
        linksCurr: function() {
            return this.$store.getters["oldStore/linksCurr"];
        }
    },
    methods: {
        fb_click: function(block_id) {
            this.$store.commit("oldStore/selectBlock", { block_id: block_id });
        },
        fb_dblclick: function(evt) {
            console.log("fb_dblclick", evt);
            this.$store.commit("oldStore/toggleLeftPanel", { show: true });
        },
        flow_click: function(evt) {
            this.$store.commit("oldStore/selectBlock", { block_id: null });
            console.log("flow_click", evt);
        },
        flow_dblclick: function(data, evt) {
            console.log("flow_dblclick", evt, data, this.$modal);
        },
        // Click on title to move block
        title_mousedown: function(block_id, evt) {
            this.blockDraggedId = block_id;
            this.$store.commit("oldStore/selectBlock", { block_id: block_id });

            this.blockOffsetX = evt.offsetX;
            this.blockOffsetY = evt.offsetY;
        },
        flow_mousemove: function(block_id, evt) {
            // Move block, but get event on all flow
            if (block_id) {
                this.$store.commit("oldStore/updatePosition", {
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
            this.$store.dispatch("oldStore/savePositions");

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
            this.$store.commit("oldStore/addLink", {
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
