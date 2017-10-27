<template>
    <tr>
        <td>
            <i class="bullseye icon"></i>
        </td>
        <td>
            {{input.name}}
        </td>
    </tr>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "binput",
  props: ["input"]
};
</script>
