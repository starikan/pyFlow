<template>
    <tr>
        <td>
            {{output.name}}
        </td>
        <td>
            <i class="bullseye icon"></i>
        </td>
    </tr>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "block-output",
  props: ["output"],
  methods: {
    linkStart: function(block_id, output_id, evt) {
      // console.log(evt);
      let startX = evt.pageX;
      let startY = evt.pageY;
    }
  }
};
</script>
