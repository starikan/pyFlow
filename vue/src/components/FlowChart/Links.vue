<template>
    <div class="link">
        <svg>
            <line :x1="output.x"
                  :y1="output.y"
                  :x2="input.x"
                  :y2="input.y"
                  style="stroke:rgb(255,0,0);stroke-width:2" />
        </svg>
    </div>
</template>

<script>
import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "links",
  props: ["link"],
  data: function() {
    return {};
  },
  methods: {
    // ...mapMutations([])
  },
  mounted() {},
  computed: {
    input: function() {
      let blockId = this.link.toBlock;
      let coords = _.get(this.ioCoords, [blockId, "input", this.link.input], {
        x: 0,
        y: 0
      });
      return coords;
    },
    output: function() {
      let blockId = this.link.fromBlock;
      let coords = _.get(this.ioCoords, [blockId, "output", this.link.output], {
        x: 0,
        y: 0
      });
      return coords;
    },
    ...mapState(["ioCoords"])
  },
  watch: {}
};
</script>
