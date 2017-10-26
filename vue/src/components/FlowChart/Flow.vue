<template>
    <div id="flow"
         @mousemove="flow_mousemove"
         @mouseup.stop="flow_mouseup">

        <div class="fb"
             v-for="(block, key) in flowCurr.blocks"
             :key="key"
             @click.stop="fb_click"
             @dragstart.stop="block_dragstart"
             @drag.stop="block_drag"
             @dragend.stop="title_mouseup"
             :draggable="draggedBlock == key"
             :style="positions_style[key]">

            <table class="fb-title"
                   @mousedown="title_mousedown(key)"
                   @mouseup.stop="title_mouseup">

                <tbody>
                    <tr>
                        <td>{{block.title}} {{positions[key]}}</td>
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
            <div class="flow-block-extend"></div>
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
      positions: {
        first_block: [1, 0, 0, 1, 0, 0]
      }
    };
  },
  name: "flow",
  mounted() {
    // document.addEventListener("mouseup", function(evt) {
    //     evt.stopPropagation()
    //     this.mousedownBlockTitle = null;
    //     console.log("mouseup", this.mousedownBlockTitle)
    // })
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
    flow_click: () => {},
    flow_mousemove: () => {},
    flow_mouseup: () => {},
    fb_click: () => {},
    fb_mouseover: () => {},
    fb_mouseout: () => {},
    title_mousedown: function(block_id) {
      this.draggedBlock = block_id;
      console.log("fb_title_mousedown", block_id, this.draggedBlock);
    },
    title_mouseup: function() {
      console.log("fb_title_mouseup");
      this.draggedBlock = null;
    },
    block_dragstart: function(evt) {
      let block_id = this.draggedBlock;
      if (block_id) {
        this.dragData.startX = evt.x;
        this.dragData.startY = evt.y;
        console.log(evt);
      }
    },
    block_drag: function(evt) {
      let block_id = this.draggedBlock;
      if (block_id) {
        this.positions[block_id][4] = evt.x - this.dragData.startX;
        this.positions[block_id][5] = evt.y - this.dragData.startY;
        console.log(evt);
      }
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
  background-color: black;
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
