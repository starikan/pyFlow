<template lang="pug">
    tr
        td(v-if="dotData.type=='output'") {{dotData.name}}
        td: i.bullseye.icon(
            @mousedown="linkStart($event)"
            @mouseup="linkEnd($event)"
            ref="icon"
        )
        td(v-if="dotData.type=='input'") {{dotData.name}}
</template>

<script>
import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "block-dot",
    props: ["dotData", "blockId"],
    // this.done value is flag of DOM complite
    data: function() {
        return {
            done: false
        };
    },
    mounted() {
        this.done = true;
    },
    methods: {
        linkStart: function(evt) {
            this.$bus.$emit("linkTempStart", {
                block_id: this.blockId,
                dot_data: this.dotData,
                dot_position: this.dotPosition
            });
        },

        linkEnd: function(evt) {
            this.$bus.$emit("linkTempEnd", {
                block_id: this.blockId,
                dot_data: this.dotData,
                dot_position: this.dotPosition
            });
        }
    },
    computed: {
        ...mapState({
            positions: state => state.flow.positions
        }),
        bounds: function() {
            return this.$refs["icon"].getBoundingClientRect();
        },
        dotPosition: function() {
            if (this.done) {
                let xy = {
                    x: this.bounds.width / 2 + this.positions[this.blockId].x,
                    y: this.bounds.height / 2 + this.positions[this.blockId].y
                };
                return xy;
            } else {
                return { x: 0, y: 0 };
            }
        }
    },
    watch: {
        dotPosition: function(curr, prev) {
            if (prev.x != curr.x || prev.y != curr.y) {
                this.$store.commit("flow/UPDATE_DOT_POSITION", {
                    block_id: this.blockId,
                    dot_id: this.dotData.id,
                    x: curr.x,
                    y: curr.y
                });
            }
        }
    }
};
</script>
