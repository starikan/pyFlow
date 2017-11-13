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
    methods: {
        linkStart: function(evt) {
            this.$bus.$emit("linkTempStart", {
                block_id: this.blockId,
                dot_data: this.data,
                dot_position: this.dotPosition
            });
        },

        linkEnd: function(evt) {
            this.$bus.$emit("linkTempEnd", {
                block_id: this.blockId,
                dot_data: this.data,
                dot_position: this.dotPosition
            });
        }
    },
    computed: {
        ...mapState({
            positions: state => state.flow.positions
        }),
        blockPosition: function() {
            return _.get(this.positions, [this.block_id], { x: 0, y: 0 });
        },
        dotPosition: function() {
            if (this.$refs["icon"]) {
                let bounds = this.$refs["icon"].getBoundingClientRect();
                return {
                    x: bounds.x + bounds.width / 2 + this.blockPosition.x,
                    y: bounds.y + bounds.height / 2 + this.blockPosition.y
                };
            } else {
                return false;
            }
        }
    }
};
</script>
