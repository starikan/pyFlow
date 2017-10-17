<template>
    <div id="flow">
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
    background-color: #99FFFF;
    position: absolute;
}
</style>
