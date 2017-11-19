<template lang="pug">

    div(@mousedown="startDrag(block_id, $event)")

        table.fb-title(
            @mousedown="draggingFlag = true")

            tbody: tr
                td {{block.title}}
                td: .flow-block-title-buttons

        table.fb-main: tbody: tr

            td: table: tbody
                block-dot.fb-inputs(
                    v-for="input in block.inputs" 
                    :key="input.id" 
                    :dot-data="input" 
                    :block-id="block_id")

            td: table: tbody
                block-dot.fb-outputs(
                    v-for="output in block.outputs" 
                    :key="output.id" 
                    :dot-data="output" 
                    :block-id="block_id")

        .flow-block-image
        .flow-block-extend

</template>

<script>
import BlockDot from "./BlockDot";

export default {
    name: "fb-block",
    components: { "block-dot": BlockDot },
    data: function() {
        return {
            draggingFlag: false
        };
    },
    props: ["block", "block_id"],
    methods: {
        startDrag: function(block_id, evt) {
            if (this.draggingFlag) {
                this.$store.commit("flow/SET_draggingBlock", {
                    offcetX: evt.offsetX,
                    offcetY: evt.offsetY,
                    block_id: block_id
                });
                this.draggingFlag = false;
            }
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
