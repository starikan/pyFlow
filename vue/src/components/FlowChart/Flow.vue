<template>
    <div id="flow">
        <div class="flow-block">
            <div class="flow-block-title">
                <div class="flow-block-title-title"></div>
                <div class="flow-block-title-buttons"></div>
            </div>
            <div class="flow-block-main">
                <div class="flow-block-main-inputs"></div>
                <div class="flow-block-main-outputs"></div>
            </div>
            <div class="flow-block-image"></div>
            <div class="flow-block-extend"></div>
        </div>
    </div>
</template>

<script>

import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: 'flow',
    mounted() { },
    computed: {
        // ...mapState([]),
        // ...mapGetters([])
    },
    methods: {
        // ...mapMutations([]),
        // ...mapActions([])
    },
    watch: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#flow {
    width: 100%;
    height: 100%;
    background-image: url("/static/background.jpg");
    position: absolute;
}
</style>
