<template lang="pug">
    #flow(
        @mousemove.stop="flow_mousemove(blockDraggedId, $event)" 
        @mouseup.stop="flow_mouseup($event)"
    )

        .fb(
        v-for="(block, block_id) in flowCurr.blocks" 
        :key="block_id" @click.stop="fb_click(block_id)" 
        :style="blocks_pos_style[block_id]"
        )

            table.fb-title(
                @mousedown.stop="title_mousedown(block_id, $event)"
            )
                tbody: tr
                    td {{block.title}}
                    td: .flow-block-title-buttons

            table.fb-main
                tbody: tr
                    td: table.fb-inputs: tbody
                        block-input(
                        v-for="input in block.inputs" 
                        :key="input.id" 
                        :input="input" 
                        :block-id="block_id"
                        )
                    td: table.fb-outputs: tbody
                        block-output(
                        v-for="output in block.outputs" 
                        :key="output.id" 
                        :output="output" 
                        :block-id="block_id"
                        )

            .flow-block-image
            .flow-block-extend

        links(
            v-for="(link, link_id) in linksCurr" 
            :key="link_id" 
            :link="link"
        )
</template>

<script>
import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import BlockInput from "./BlockInput";
import BlockOutput from "./BlockOutput";
import Links from "./Links";

export default {
    data: function() {
        return {
            blockSelectedId: null,
            blockDraggedId: null,
            blockOffsetX: 0,
            blockOffsetY: 0
        };
    },
    components: { BlockInput, BlockOutput, Links },
    name: "flow",
    mounted() {
        this.getPositions();
    },
    computed: {
        blocks_pos_style: function() {
            return _.mapValues(
                this.blocksPositions,
                val => `transform: matrix(${val})`
            );
        },
        linesData: function() {
            let data = {};
            _.forEach(this.linksCurr, (link, id) => {
                let coords = {};
                let fromBlock = link.fromBlock;
                let toBlock = link.toBlock;
                let output = link.output;
                let input = link.input;
            });
            return data;
        },
        ...mapState(["flow"]),
        ...mapGetters(["flowCurr", "blocksPositions", "linksCurr"])
    },
    methods: {
        getCoordInOut: function() {},
        fb_click: function(block_id) {
            this.blockSelectedId = block_id;
        },
        // First click on title to move block
        title_mousedown: function(block_id, evt) {
            this.blockDraggedId = block_id;
            this.blockOffsetX = evt.offsetX;
            this.blockOffsetY = evt.offsetY;
        },
        // Second move clock, but get event on all flow
        flow_mousemove: function(block_id, evt) {
            this.updatePosition({
                block_id: block_id,
                panX: evt.pageX - this.blockOffsetX,
                panY: evt.pageY - this.blockOffsetY
            });
            return false;
        },
        // End of dragging
        flow_mouseup: function(evt) {
            this.blockDraggedId = null;
            this.savePositions();
        },
        ...mapMutations(["updatePosition"]),
        ...mapActions(["savePositions", "getPositions"])
    },
    watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#flow {
    width: 100%;
    height: 100%;
    background-image: url("/static/background.jpg");
    position: absolute;
    font-family: "Open Sans Condensed", sans-serif;
}

.fb {
    position: absolute;
    border-color: black;
    background-color: white;
}

.fb-title {
    font-size: 28px;
    padding: 5px;
    width: 100%;
    background-color: magenta;
}

.fb-main {
    /* font-size: 28px; */
    padding: 5px;
    width: 100%;
    background-color: green;
}

.fb-main td {
    vertical-align: top;
}

.fb-outputs {
    text-align: right;
}
</style>
