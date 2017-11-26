<template lang="pug">

    div

        table.fb-title(
            @mousedown="startDrag(block_id, $event)")

            tbody: tr
                td {{block.title}}
                td: .flow-block-title-buttons

        table.fb-main: tbody: tr

            td: table: tbody
                block-dot.fb-inputs(
                    v-for="input in inputs" 
                    :key="input.id" 
                    :dot-data="input" 
                    :block-id="block_id")

            td.outputs-td: table: tbody
                block-dot.fb-outputs(
                    v-for="output in outputs" 
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
    props: ["block", "block_id"],
    methods: {
        startDrag: function(block_id, evt) {
            this.$bus.$emit("draggingBlock", block_id);
        }
    },
    computed: {
        inputs: function() {
            return this.block.dots.filter(val => val.type == "input");
        },
        outputs: function() {
            return this.block.dots.filter(val => val.type == "output");
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

.outputs-td
    float right
</style>
