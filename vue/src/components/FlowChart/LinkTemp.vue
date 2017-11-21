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
            y2: -1000,
            startDot: null,
            endDot: null
        };
    },
    created: function() {
        document.addEventListener("mousemove", this.mousemove);
        document.addEventListener("mouseup", this.mouseup);
    },
    destroyed: function() {
        document.removeEventListener("mousemove", this.mousemove);
        document.removeEventListener("mouseup", this.mouseup);
    },
    computed: {
        flowZoom: function() {
            return this.$store.state.flow.flowZoom;
        },
        flowPosition: function() {
            return this.$store.state.flow.flowPosition;
        }
    },
    methods: {
        mousemove: function(evt) {
            if (this.x1 > -1000 && this.y1 > -1000) {
                this.x2 = evt.pageX - this.flowPosition.x;
                this.y2 = evt.pageY - this.flowPosition.y;
            }
        },
        mouseup: function(evt) {
            this.x1 = this.y1 = this.x2 = this.y2 = -1000;
            this.startDot = null;
            this.endDot = null;
        }
    },
    mounted() {
        this.$bus.$on("linkTempStart", evt => {
            this.x1 = this.x2 = _.get(evt, ["dot_position", "x"], -1000);
            this.y1 = this.y2 = _.get(evt, ["dot_position", "y"], -1000);

            this.startDot = {
                blockId: evt.block_id,
                dotId: evt.dot_data.id,
                dotType: evt.dot_data.type
            };
        });

        this.$bus.$on("linkTempEnd", evt => {
            this.x1 = this.y1 = this.x2 = this.y2 = -1000;

            this.endDot = {
                blockId: evt.block_id,
                dotId: evt.dot_data.id,
                dotType: evt.dot_data.type
            };

            this.$store.commit("flow/UPDATE_link", {
                startDot: this.startDot,
                endDot: this.endDot
            });

            this.startDot = null;
            this.endDot = null;
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
