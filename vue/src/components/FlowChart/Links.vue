<template lang="pug">
    .link: svg: line(
        :x1="x1"
        :y1="y1"
        :x2="x2"
        :y2="y2"
        style="stroke:rgb(255,0,0);stroke-width:2"
        @dblclick="line_dblclick($event)"
    )
</template>

<script>
import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "links",
    props: ["link", "linkId"],
    methods: {
        ...mapMutations(["removeLink"]),

        line_dblclick: function(evt) {
            this.removeLink({ link_id: this.linkId });
        }
    },
    computed: {
        ...mapState(["ioCoords"]),

        input: function() {
            let coords = { x: 0, y: 0 };
            if (this.link) {
                coords = _.get(this.ioCoords, [
                    this.link.toBlock,
                    "input",
                    this.link.input
                ]);
            }
            return coords;
        },

        output: function() {
            let coords = { x: 0, y: 0 };
            if (this.link) {
                coords = _.get(this.ioCoords, [
                    this.link.fromBlock,
                    "output",
                    this.link.output
                ]);
            }
            return coords;
        },

        x1: function() {
            return _.get(this.input, ["x"], 0);
        },

        y1: function() {
            return _.get(this.input, ["y"], 0);
        },

        x2: function() {
            return _.get(this.output, ["x"], 0);
        },

        y2: function() {
            return _.get(this.output, ["y"], 0);
        }
    }
};
</script>

<style>
.link,
svg {
    width: 100%;
    height: 100%;
}
</style>
