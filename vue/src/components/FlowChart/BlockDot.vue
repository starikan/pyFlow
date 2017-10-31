<template lang="pug">
    tr
        td(v-if="data.type=='output'") {{data.name}}
        td: i.bullseye.icon(
            @mousedown="linkStart($event)"
            ref="icon"
        )
        td(v-if="data.type=='input'") {{data.name}}
</template>

<script>
import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "block-dot",
    props: ["data", "blockId"],
    data: function() {
        return {
            currBlock: null
        };
    },
    methods: {
        ...mapMutations(["updateIOCoords"]),

        linkStart: function(evt) {
            console.log(evt);
            console.log(this.data, this.blockId);
            let startX = evt.pageX;
            let startY = evt.pageY;
        }
    },
    computed: {
        ...mapGetters(["blocksPositions"]),

        // Update like this, i.e. on every move update every coord
        // needs in that point then blocks will modify in live
        coords: function() {
            if (this.currBlock && this.$refs["icon"]) {
                let bounds = this.$refs["icon"].getBoundingClientRect();
                return {
                    x: bounds.x + bounds.width / 2,
                    y: bounds.y + bounds.height / 2
                };
            } else {
                return false;
            }
        }
    },
    watch: {
        blocksPositions: function(newPos) {
            if (!_.isEqual(newPos[this.blockId], this.currBlock)) {
                this.currBlock = _.clone(newPos[this.blockId]);
            }
        },
        coords: function(newCoords) {
            this.updateIOCoords({
                block_id: this.blockId,
                ioType: this.data.type,
                ioId: this.data.id,
                coords: newCoords
            });
        }
    }
};
</script>
