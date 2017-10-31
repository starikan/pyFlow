<template lang="pug">
    tr
        td {{output.name}}
        td: i.bullseye.icon(
            @mousedown="linkStart($event)"
            ref="icon"
        )
</template>

<script>
import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "block-output",
    props: ["output", "blockId"],
    data: function() {
        return {};
    },
    methods: {
        linkStart: function(evt) {
            console.log(evt);
            let startX = evt.pageX;
            let startY = evt.pageY;
        },
        ...mapMutations(["updateIOCoords"])
    },
    computed: {
        pageX: function() {
            if (this.blocksPositions && this.$refs["icon"]) {
                // TODO Это значение уплывает, хотя должно быть постоянным если не меняется блок
                let childX = this.$refs["icon"].getBoundingClientRect().x;
                let parentX = this.blocksPositions[this.blockId][4];
                // console.log(childX);
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
                ioType: "output",
                ioId: this.output.id,
                coords: { x: newX, y: this.pageY }
            });
        },
        pageY: function(newY) {
            this.updateIOCoords({
                block_id: this.blockId,
                ioType: "output",
                ioId: this.output.id,
                coords: { x: this.pageX, y: newY }
            });
        }
    }
};
</script>
