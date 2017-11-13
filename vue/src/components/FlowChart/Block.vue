<template lang="pug">

    div
        table.fb-title( 
            v-stream:mousedown = "{subject: $streams.drag$}"
            v-stream:mouseup = "{subject: $streams.drag$}"
            v-stream:mouseleave = "{subject: $streams.drag$}")

            tbody: tr
                td {{block.title}}
                td: .flow-block-title-buttons

        table.fb-main: tbody: tr

            td: table: tbody
                block-dot.fb-inputs(
                    v-for="input in block.inputs" 
                    :key="input.id" 
                    :data="input" 
                    :block-id="block_id"
                    @linkStart="linkStart"
                    @linkEnd="linkEnd")

            td: table: tbody
                block-dot.fb-outputs(
                    v-for="output in block.outputs" 
                    :key="output.id" 
                    :data="output" 
                    :block-id="block_id"
                    @linkStart="linkStart"
                    @linkEnd="linkEnd")

        .flow-block-image
        .flow-block-extend

</template>

<script>
import Rx from "rxjs";

import BlockDot from "./BlockDot";

export default {
    name: "fb-block",
    components: {
        "block-dot": BlockDot
    },
    props: ["block", "block_id"],
    data: function() {
        return {};
    },
    subscriptions() {
        this.$streams = {}; // Streams to subscribe

        /*
            Title interaction stream
        */
        this.$streams.drag$ = new Rx.BehaviorSubject(null)
            .skip(1)
            .pluck("event")
            .distinctUntilChanged()
            .map(event => ({
                offcetX: event.offsetX,
                offcetY: event.offsetY,
                block_id: this.block_id,
                condition: event.type
            }))
            .distinctUntilChanged((prev, curr) => {
                return curr.condition == "mouseleave" && prev.condition != "mousedown";
            })
            .share();

        this.$streams.drag$.subscribe(val => this.$bus.$emit("$stream.fb_title_events", val));

        return this.$streams; // Same names as streams values
    },
    methods: {
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
    }
};
</script>

<style lang="stylus">
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
</style>
