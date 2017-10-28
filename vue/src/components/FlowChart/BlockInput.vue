<template>
    <tr>
        <td>
            <i class="bullseye icon"
               ref="icon"></i>
        </td>
        <td>
            {{input.name}}
        </td>
    </tr>
</template>

<script>
import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "block-input",
  props: ["input", "blockId"],
  data: function() {
    return {
      renderDone: false
    };
  },
  methods: {
    ...mapMutations(["updateIOCoords"])
  },
  mounted() {
    this.renderDone = true;
  },
  computed: {
    pageX: function() {
      if (this.renderDone) {
        let childX = this.$refs["icon"].getBoundingClientRect().x;
        let parentX = this.blocksPositions[this.blockId][4];
        return childX + parentX;
      } else {
        return 0;
      }
    },
    pageY: function() {
      if (this.renderDone) {
        let childX = this.$refs["icon"].getBoundingClientRect().y;
        let parentX = this.blocksPositions[this.blockId][5];
        return childX + parentX;
      } else {
        return 0;
      }
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
    coords: function(newCoords) {
      // TODO: срабатывает 2 раза за каждое движение. Сократить в 2 раза
      this.updateIOCoords({
        block_id: this.blockId,
        ioType: "input",
        ioId: this.input.id,
        coords: newCoords
      });
    }
  }
};
</script>
