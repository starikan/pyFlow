<template lang="pug">
    tr
        td(v-if="data.type=='output'") {{data.name}}
        td: i.bullseye.icon(
            @mousedown="linkStart($event)"
            @mouseup="linkEnd($event)"
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
        linkStart: function(evt) {
            this.$emit("linkStart", {
                block_id: this.blockId,
                data: this.data,
                coords: this.coords
            });
        },

        linkEnd: function(evt) {
            this.$emit("linkEnd", {
                block_id: this.blockId,
                data: this.data,
                coords: this.coords
            });
        }
    },
    computed: {
        blocksPositions: function() {
            return this.$store["oldStore/blocksPositions"];
        },
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
        // Need only element of object updates
        blocksPositions: function(newPos) {
            if (!_.isEqual(newPos[this.blockId], this.currBlock)) {
                this.currBlock = _.clone(newPos[this.blockId]);
            }
        },
        coords: function(newCoords) {
            this.$store.commit("updateIOCoords", {
                block_id: this.blockId,
                ioType: this.data.type,
                ioId: this.data.id,
                coords: newCoords
            });
        }
    }
};
</script>
