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
            this.$store.commit("removeLink", { link_id: this.linkId });
        }
    },
    computed: {
        input: function() {
            return this.$store.state.flow.dotsPositions[this.link.input.block_id][this.link.input.dot_id];
        },
        output: function() {
            return this.$store.state.flow.dotsPositions[this.link.output.block_id][this.link.output.dot_id];
        }
    }
};
</script>