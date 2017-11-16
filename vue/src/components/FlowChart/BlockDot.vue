<template lang="pug">

    tr
        td(v-if="dotData.type=='output'") {{dotData.name}}
        td: i.bullseye.icon(
            @mousedown="linkStart($event)"
            @mouseup="linkEnd($event)"
            ref="icon")
        td(v-if="dotData.type=='input'") {{dotData.name}}

</template>

<script>
import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "block-dot",
    props: ["dotData", "blockId"],
    data: function() {
        return {
            dotPosition: {}
        };
    },
    mounted() {
        this.getBounds(); // Get position on start app
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
        },

        getBounds: function() {
            let bounds = this.$refs["icon"].getBoundingClientRect();
            let position = {
                x: bounds.width / 2 + bounds.x,
                y: bounds.height / 2 + bounds.y
            };
            this.dotPosition = position;

            this.$store.commit("flow/UPDATE_DOT_POSITION", {
                block_id: this.blockId,
                dot_id: this.dotData.id,
                x: position.x,
                y: position.y
            });
        }
    },
    computed: {
        ...mapState({
            positions: state => state.flow.positions
        }),
        blockPosition: function() {
            return this.positions[this.blockId];
        }
    },
    watch: {
        blockPosition: function() {
            this.getBounds();
        }
    }
};
</script>
