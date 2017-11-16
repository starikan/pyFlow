<template lang="pug">
    line(
        :x1="x1"
        :y1="y1"
        :x2="x2"
        :y2="y2"
        style="stroke:rgb(255,0,0);stroke-width:2"
        @dblclick.stop="line_dblclick($event)"
    )
</template>

<script>
import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "link",
    props: ["link", "linkId"],
    data: function() {
        return {
            block_input: this.link.input.block_id,
            block_output: this.link.output.block_id,
            dot_input: this.link.input.dot_id,
            dot_output: this.link.output.dot_id
        };
    },
    methods: {
        line_dblclick: function(evt) {
            this.$store.commit("removeLink", { link_id: this.linkId });
        }
    },
    computed: {
        dotsPositions: function() {
            return this.$store.state.flow.dotsPositions;
        },
        input: function() {
            let block_id = this.link.input.block_id;
            let dot_id = this.link.input.dot_id;
            if (!_.get(this.dotsPositions, [block_id, dot_id], false)) {
                _.set(this.dotsPositions, [block_id, dot_id], { x: 0, y: 0 });
            }
            return this.dotsPositions[block_id][dot_id];
        },

        output: function() {
            let block_id = this.link.output.block_id;
            let dot_id = this.link.output.dot_id;
            if (!_.get(this.dotsPositions, [block_id, dot_id], false)) {
                _.set(this.dotsPositions, [block_id, dot_id], { x: 0, y: 0 });
            }
            return this.dotsPositions[block_id][dot_id];
        },

        x1: function() {
            return this.input.x;
        },

        y1: function() {
            return this.input.y;
            // return _.get(this.input, ["y"]);
        },

        x2: function() {
            return _.get(this.output, ["x"]);
        },

        y2: function() {
            return _.get(this.output, ["y"]);
        }
    }
};
</script>