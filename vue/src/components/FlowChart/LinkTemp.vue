<template lang="pug">
    .linkTemp
        svg: line(
            :x1="x1"
            :y1="y1"
            :x2="x2"
            :y2="y2"
            style="stroke:rgb(255,0,0);stroke-width:2"
        )
</template>

<script>
export default {
    name: "link-temp",
    data: function() {
        return {
            x1: -1000,
            x2: -1000,
            y1: -1000,
            y2: -1000
        };
    },
    created: function() {
        document.addEventListener("mousemove", this.mousemove);
    },
    destroyed: function() {
        document.removeEventListener("mousemove", this.mousemove);
    },
    methods: {
        mousemove: function(evt) {
            if (this.x1 > -1000 && this.y1 > -1000) {
                this.x2 = evt.pageX;
                this.y2 = evt.pageY;
            }
        }
    },
    mounted() {
        this.$bus.$on("linkTempStart", evt => {
            console.log(evt);
            this.x1 = _.get(evt, ["dot_position", "x"], -1000);
            this.y1 = _.get(evt, ["dot_position", "y"], -1000);
        });
        this.$bus.$on("linkTempEnd", evt => {
            console.log(evt);
            this.x1 = this.y1 = this.x2 = this.y2 = -1000;

            //     this.$store.commit("oldStore/addLink", {
            //         dot0: {
            //             dot_id: evt.data.id,
            //             dot_type: evt.data.type,
            //             block_id: evt.block_id
            //         },
            //         dot1: {
            //             dot_id: this.linkTempData.data.id,
            //             dot_type: this.linkTempData.data.type,
            //             block_id: this.linkTempData.block_id
            //         }
            //     });
        });
    }
};
</script>

<style lang="stylus" scoped>
.linkTemp, svg
    width 100%
    height 100%
    position absolute
    z-index 1000
    pointer-events none
</style>
