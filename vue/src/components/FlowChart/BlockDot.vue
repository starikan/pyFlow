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
        let self = this;
        document.fonts.ready.then(function() {
            self.getBounds();
        });
    },
    methods: {
        linkStart: function(evt) {
            console.log(evt);
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
            let blockDOM = this.$refs["icon"].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
                .parentNode.parentNode.parentNode;
            let blockBounds = blockDOM.getBoundingClientRect();

            let position = {
                x: this.blockPosition.x + (bounds.width / 2 + bounds.x - blockBounds.x) / this.flowZoom,
                y: this.blockPosition.y + (bounds.height / 2 + bounds.y - blockBounds.y) / this.flowZoom
            };
            this.dotPosition = position;

            this.$store.commit("flow/UPDATE_dotsPositions", {
                block_id: this.blockId,
                dot_id: this.dotData.id,
                x: position.x,
                y: position.y
            });
        }
    },
    computed: {
        ...mapState({
            blocksPositions: state => state.flow.blocksPositions,
            flowZoom: state => state.flow.flowZoom
        }),
        blockPosition: function() {
            return this.blocksPositions[this.blockId];
        }
    },
    watch: {
        blockPosition: function() {
            this.getBounds();
        }
    }
};
</script>
