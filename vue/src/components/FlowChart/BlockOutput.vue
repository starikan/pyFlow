<template>
    <tr>
        <td>
            {{output.name}}
        </td>
        <td>
            <i class="bullseye icon"
               @mousedown="linkStart($event)"
               ref="icon"></i>
        </td>
    </tr>
</template>

<script>
import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "block-output",
  props: ["output", "blockId"],
  methods: {
    linkStart: function(evt) {
      console.log(evt);
      let startX = evt.pageX;
      let startY = evt.pageY;
    },
    ...mapMutations(["updateIOCoords"])
  },
  mounted() {},
  computed: {
    pageX: function() {
      return (
        this.$refs["icon"].getBoundingClientRect().x +
        this.blocksPositions[this.blockId][4]
      );
    },
    pageY: function() {
      return (
        this.$refs["icon"].getBoundingClientRect().y +
        this.blocksPositions[this.blockId][5]
      );
    },
    coords: function() {
      return {
        x: this.pageX,
        y: this.pageY
      };
    },
    ...mapGetters(["blocksPositions"])
  },
  watch: {
    // coords: function(newCoords) {
    //   this.updateIOCoords({
    //     block_id: this.blockId,
    //     ioType: "output",
    //     oiId: this.output.id,
    //     coords: newCoords
    //   });
    // }
  }
};
</script>
