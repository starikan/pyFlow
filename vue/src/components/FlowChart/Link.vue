<template lang="pug">
    line(
        :x1="input.x"
        :y1="input.y"
        :x2="output.x"
        :y2="output.y"
        style="stroke:rgb(255,0,0);stroke-width:2"
        @dblclick.stop="line_dblclick($event)"
    )
</template>

<script>
export default {
    name: "link",
    props: ["link", "linkId"],
    methods: {
        line_dblclick: function(evt) {
            this.$store.commit("flow/DELETE_LINK_flow", { linkId: this.linkId });
        }
    },
    computed: {
        input: function() {
            return this.$store.state.flow.dotsPositions[this.link.input.blockId][this.link.input.dotId];
        },
        output: function() {
            return this.$store.state.flow.dotsPositions[this.link.output.blockId][this.link.output.dotId];
        }
    }
};
</script>