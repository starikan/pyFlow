<template lang="pug">
    //- @dblclick.stop="flow_dblclick($event)"
        @mousemove.stop="flow_mousemove($event)" 
        @mouseup.stop="flow_mouseup($event)"
    #flow(
        v-stream:mousedown.stop.native="{subject: $streams.block_select$, data: null}" 
        v-stream:mousemove.stop.native="{subject: $streams.block_move$}" 
        @mouseup.stop="flow_mouseup($event)"
        )

        link-temp( 
            :x1="linkTempStartCoords.x"
            :y1="linkTempStartCoords.y"
            :x2="linkTempEndCoords.x"
            :y2="linkTempEndCoords.y")

        .link: svg: links(
            v-for="(link, link_id) in linksCurr" 
            :key="link_id" 
            
            :link="link"
            :link-id="link_id")

        fb-block.fb(
            :style="block_style(block_id)"
            v-for="(block, block_id) in flow.blocks" 
            :key="block_id" 
            :class="[{'select': block_id == block_select$}]"
            
            v-stream:mousedown.stop.native="{subject: $streams.block_select$, data: block_id}" 
            @dblclick.stop.native="fb_dblclick($event)"
            
            :block="block"
            :block_id="block_id")

</template>

<script>
import _ from "lodash";
import { mapState, mapGetters } from "vuex";

import Rx from "rxjs";

// import BlockDot from "./BlockDot";
import Block from "./Block";
import Links from "./Links";
import LinkTemp from "./LinkTemp";

export default {
    name: "flow",
    components: { links: Links, "link-temp": LinkTemp, "fb-block": Block },
    subscriptions() {
        this.$streams = {}; // Streams to subscribe

        /*
            Block selection stream
        */
        this.$streams.block_select$ = new Rx.BehaviorSubject({ data: null })
            .pluck("data")
            .distinctUntilChanged()
            .share();

        /*
            Events from all Blocks merge stream
        */
        this.$streams.block_drag_flag$ = new Rx.Observable.fromEventPattern(h =>
            this.$bus.$on("$stream.fb_title_events", h)
        );

        /*
            Mouse move and drag blocks stream
        */
        this.$streams.block_move$ = new Rx.BehaviorSubject({ event: null })
            .skip(1)
            .withLatestFrom(this.$streams.block_drag_flag$)
            // TODO: mouseleave
            .filter(([evt, flag]) => _.get(flag, "condition") == "mousedown")
            .map(([evt, flag]) => ({
                [flag.block_id]: {
                    x: evt.event.pageX - flag.offcetX,
                    y: evt.event.pageY - flag.offcetY
                }
            }));

        this.$streams.block_move$.subscribe(val => {
            this.$store.commit("flow/UPDATE_BLOCK_POSITION", val);
            let matrix = _.mapValues(val, xy => `matrix(1, 0, 0, 1, ${xy.x}, ${xy.y})`);
            _.forEach(matrix, (value, key) => {
                this.$set(this.transform_matrix, key, value);
            });
            // Not working issues
            // this.$set(this, "transform_matrix", Object.assign(this.transform_matrix, matrix));
            // this.transform_matrix = Object.assign(this.transform_matrix, matrix);
        });

        return this.$streams;
    },
    data: function() {
        return {
            transform_matrix: {},

            linkTempFlag: false,
            linkTempData: {},
            linkTempStartCoords: { x: 0, y: 0 },
            linkTempEndCoords: { x: 0, y: 0 }
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
            positions: state => state.flow.positions
        }),
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
        flow_dblclick: function(data, evt) {
            console.log("flow_dblclick", evt, data, this.$modal);
        },
        flow_mousemove: function(evt) {
            // Temp link move
            if (this.linkTempFlag) {
                this.linkTempEndCoords = { x: evt.clientX, y: evt.clientY };
            }
            return false;
        },
        // End of dragging
        flow_mouseup: function(evt) {
            this.$store.dispatch("base/saveData");
            this.linkTempFlag = false;
            this.linkTempData = {};
            this.linkTempStartCoords = { x: 0, y: 0 };
            this.linkTempEndCoords = { x: 0, y: 0 };
            return false;
        },
        block_style: function(block_id) {
            console.log(block_id, this.transform_matrix[block_id]);
            return {
                transform: _.get(this.transform_matrix, [block_id]),
                "z-index": block_id == this.block_select$ ? 1000 : 0
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
