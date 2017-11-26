<template lang="pug">
    #infopanel
        #blockInformation
            h3 Block
            table: tbody: tr
                td: p title
                td: input(v-model="title")

</template>

<script>
import { mapState } from "vuex";

export default {
    name: "info-panel",
    data: function() {
        return {
            blockId: null,
            block: {
                title: ""
            }
        };
    },
    computed: {
        // ...mapState()
        title: {
            get: function() {
                return this.block.title;
            },
            set: function(newValue) {
                this.$store.commit({
                    type: "flow/SET_flow",
                    path: ["blocks", this.blockId, "title"],
                    value: newValue
                });
            }
        }
    },
    mounted() {
        this.$bus.$on("blockToInfoPanel", (block, blockId) => {
            this.blockId = blockId;
            this.block = block;
        });
    }
};
</script>

<style lang="stylus" scoped>
#infopanel
    position absolute
    top 0px
    right 0px
    height 100%
    width 250px
    background-color rgba(127, 127, 127, 0.8)

    h3
        background-color rgba(80, 80, 80, 1)

    h3, h4
        text-align center
        margin 10px 0px 10px 0px

    table
        margin 10px
</style>
