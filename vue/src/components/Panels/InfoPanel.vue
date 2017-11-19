<template>
    <div id="infopanel">
        <div class="ui container">

        </div>
    </div>
</template>



<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: 'info-panel',
    computed: {
        // ...mapState(['selectedLink']),
        // ...mapGetters(['countPlus10',])
    },
    methods: {
        // ...mapMutations(['addBlock', 'deleteBlock', 'deleteLink', "saveFlow"]),
        // ...mapActions({ incrementAsync: 'increment' })
    }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#infopanel {
    height: 100%;
    width: 150px;
    position: absolute;
    top: 0px;
    right: 0px;
    background-color: #FFFF99
}
</style>
