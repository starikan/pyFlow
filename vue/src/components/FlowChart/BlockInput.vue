<template lang="pug">
    tr
        td: i.bullseye.icon(ref="icon")
        td {{input.name}}
</template>

<script>
import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "block-input",
    props: ["input", "blockId"],
    methods: {
        ...mapMutations(["updateIOCoords"])
    },
    computed: {
        pageX: function() {
            if (this.blocksPositions && this.$refs["icon"]) {
                let childX = this.$refs["icon"].getBoundingClientRect().x;
                let parentX = this.blocksPositions[this.blockId][4];
                return childX + parentX;
            } else {
                return 0;
            }
        },
        pageY: function() {
            if (this.blocksPositions && this.$refs["icon"]) {
                let childX = this.$refs["icon"].getBoundingClientRect().y;
                let parentX = this.blocksPositions[this.blockId][5];
                return childX + parentX;
            } else {
                return 0;
            }
        },
        ...mapGetters(["blocksPositions"])
    },
    watch: {
        // Update like this, i.e. on every move update every coord
        // needs in that point then blocks will modify in live
        pageX: function(newX) {
            this.updateIOCoords({
                block_id: this.blockId,
                ioType: "input",
                ioId: this.input.id,
                coords: { x: newX, y: this.pageY }
            });
        },
        pageY: function(newY) {
            this.updateIOCoords({
                block_id: this.blockId,
                ioType: "input",
                ioId: this.input.id,
                coords: { x: this.pageX, y: newY }
            });
        }
    }
};
</script>
