<template>
    <div id="flow">

        <div class="fb"
             v-for="(block, key) in flowCurr.blocks"
             :key="key"
             @click.stop="fb_click(key)"
             @dragstart.stop="block_dragstart(key, $event)"
             @drag.stop="block_drag(key, $event)"
             @dragend.stop="block_dragend(key, $event)"
             :draggable="draggedBlock == key"
             :style="positions_style[key]">

            <table class="fb-title"
                   @mousedown="title_mousedown(key)">

                <tbody>
                    <tr>
                        <td>{{block.title}}</td>
                        <td>
                            <div class="flow-block-title-buttons"></div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table class="fb-main">
                <tbody>
                    <tr>
                        <td>
                            <table class="fb-inputs">
                                <tbody>
                                    <tr v-for="input in block.inputs"
                                        :key="input.id">
                                        <td>
                                            <i class="bullseye icon"></i>
                                        </td>
                                        <td>
                                            {{input.name}}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table class="fb-outputs">
                                <tbody>
                                    <tr v-for="output in block.outputs"
                                        :key="output.id">
                                        <td>
                                            {{output.name}}
                                        </td>
                                        <td>
                                            <i class="bullseye icon"></i>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="flow-block-image"></div>
            <div class="flow-block-extend">
                <p>{{positions[key]}}</p>
                <p>{{positions_style[key]}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data: function() {
    return {
      selectedBlock: null,
      draggedBlock: null,
      dragData: {
        startX: 0,
        startY: 0
      },
      positions: {}
    };
  },
  name: "flow",
  mounted() {
    _.forEach(this.flowCurr.blocks, (val, key) => {
      if (!(key in this.positions)) {
        this.$set(this.positions, key, [1, 0, 0, 1, 0, 0]);
      }
    });
  },
  computed: {
    positions_style: function() {
      let positions = {};
      _.forEach(this.positions, (val, key) => {
        positions[key] = `transform: matrix(${val})`;
      });
      return positions;
    },
    ...mapState(["flow"]),
    ...mapGetters(["flowCurr"])
  },
  methods: {
    fb_click: function(block_id) {
      this.selectedBlock = block_id;
    },
    title_mousedown: function(block_id) {
      this.draggedBlock = block_id;
    },
    block_dragstart: function(block_id, evt) {
      //   let block_id = this.draggedBlock;
      if (this.draggedBlock == block_id) {
        this.dragData.startX = evt.offsetX;
        this.dragData.startY = evt.offsetY;
      }
    },
    block_drag: function(key, evt) {
      let block_id = this.draggedBlock;
      if (block_id) {
        this.$set(this.positions[block_id], 4, evt.x - this.dragData.startX);
        this.$set(this.positions[block_id], 5, evt.y - this.dragData.startY);
      }
      return false;
    },
    block_dragend: function(key, evt) {
      let block_id = this.draggedBlock;
      if (block_id) {
        this.$set(this.positions[block_id], 4, evt.x - this.dragData.startX);
        this.$set(this.positions[block_id], 5, evt.y - this.dragData.startY);
      }
      this.draggedBlock = null;
      this.dragData.startX = 0;
      this.dragData.startY = 0;
    }
    // ...mapMutations([]),
    // ...mapActions([])
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#flow {
  width: 100%;
  height: 100%;
  background-image: url("/static/background.jpg");
  position: absolute;
  font-family: "Open Sans Condensed", sans-serif;
}

.fb {
  position: absolute;
  border-color: black;
  background-color: white;
}

.fb-title {
  font-size: 28px;
  padding: 5px;
  width: 100%;
  background-color: magenta;
}

.fb-main {
  /* font-size: 28px; */
  padding: 5px;
  width: 100%;
  background-color: green;
}

.fb-main td {
  vertical-align: top;
}

.fb-outputs {
  text-align: right;
}
</style>
