<template lang="pug">
    .link: svg: line(
        v-bind:x1="x1"
        v-bind:y1="y1"
        v-bind:x2="x2"
        v-bind:y2="y2"
        style="stroke:rgb(255,0,0);stroke-width:2"
    )
</template>

<script>
import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "links",
    props: ["link"],
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
            let coord = 0;
            if (this.input) {
                coord = this.input.x;
            }
            return coord;
        },

        y1: function() {
            let coord = 0;
            if (this.input) {
                coord = this.input.y;
            }
            return coord;
        },

        x2: function() {
            let coord = 0;
            if (this.output) {
                coord = this.output.x;
            }
            return coord;
        },

        y2: function() {
            let coord = 0;
            if (this.output) {
                coord = this.output.y;
            }
            return coord;
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
