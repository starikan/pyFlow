<template>
  <div id="flow">
    <div class="fb"
         v-for="(block, block_id) in flowCurr.blocks"
         :key="block_id"
         @click.stop="fb_click(block_id)"
         @dragstart.stop="block_dragstart(block_id, $event)"
         @drag.stop="block_drag($event)"
         @dragend.stop="block_dragend($event)"
         :draggable="draggedBlock == block_id"
         :style="blocks_pos_style[block_id]">

      <table class="fb-title"
             @mousedown="title_mousedown(block_id)">

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
                  <block-input v-for="input in block.inputs"
                               :key="input.id"
                               :input="input"
                               :block-id="block_id">
                  </block-input>
                </tbody>
              </table>
            </td>
            <td>
              <table class="fb-outputs">
                <tbody>
                  <block-output v-for="output in block.outputs"
                                :key="output.id"
                                :output="output"
                                :block-id="block_id"></block-output>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flow-block-image"></div>
      <div class="flow-block-extend"></div>
    </div>
    <links v-for="(link, link_id) in linksCurr"
           :key="link_id"
           :link="link"></links>

  </div>
</template>

<script>
import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import BlockInput from "./BlockInput";
import BlockOutput from "./BlockOutput";
import Links from "./Links";

export default {
  data: function() {
    return {
      selectedBlock: null,
      draggedBlock: null,
      dragData: {
        startX: 0,
        startY: 0
      }
    };
  },
  components: { BlockInput, BlockOutput, Links },
  name: "flow",
  mounted() {
    this.getPositions();
  },
  computed: {
    blocks_pos_style: function() {
      return _.mapValues(
        this.blocksPositions,
        val => `transform: matrix(${val})`
      );
    },
    linesData: function() {
      let data = {};
      _.forEach(this.linksCurr, (link, id) => {
        let coords = {};
        let fromBlock = link.fromBlock;
        let toBlock = link.toBlock;
        let output = link.output;
        let input = link.input;
        // console.log(link, id);
      });
      return data;
    },
    ...mapState(["flow"]),
    ...mapGetters(["flowCurr", "blocksPositions", "linksCurr"])
  },
  methods: {
    getCoordInOut: function() {},
    fb_click: function(block_id) {
      this.selectedBlock = block_id;
    },
    title_mousedown: function(block_id) {
      this.draggedBlock = block_id;
    },
    block_dragstart: function(block_id, evt) {
      if (this.draggedBlock == block_id) {
        this.dragData.startX = evt.offsetX;
        this.dragData.startY = evt.offsetY;
      }
    },
    block_drag: function(evt) {
      let block_id = this.draggedBlock;
      if (block_id) {
        this.updatePosition({
          block_id: block_id,
          panX: evt.x - this.dragData.startX,
          panY: evt.y - this.dragData.startY
        });
      }
    },
    block_dragend: function(evt) {
      let block_id = this.draggedBlock;
      if (block_id) {
        this.updatePosition({
          block_id: block_id,
          panX: evt.x - this.dragData.startX,
          panY: evt.y - this.dragData.startY
        });
        this.draggedBlock = null;
        this.dragData.startX = 0;
        this.dragData.startY = 0;

        this.savePositions();
      }
    },
    ...mapMutations(["updatePosition"]),
    ...mapActions(["savePositions", "getPositions"])
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
