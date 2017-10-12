<template>
    <div>
        <div id="flow"></div>
    </div>
</template>



<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

var data = {};

function flowController(self) {
    let $flow = $('#flow').flowchart({
        data: self.currFlowData,
        onOperatorSelect: (blockId) => {
            self.selectBlock(blockId)
            return true;
        },
        onOperatorUnselect: () => {
            self.unSelectBlock()
            return true;
        },
        onOperatorMouseOver: (blockId) => {
            self.activeBlock(blockId)
            return true;
        },
        onOperatorMouseOut: () => {
            self.unActiveBlock()
            return true;
        },
    });

}

export default {
    name: 'flow',
    mounted() {
        $(document).ready(() => flowController(this));
    },
    computed: {
        // ...mapState(['']),
        ...mapGetters(['currFlowData'])
    },
    methods: {
        ...mapMutations(['setBlockPosition', 'selectBlock', 'unSelectBlock', 'activeBlock', 'unActiveBlock']),
        // ...mapActions([''])
    }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#flow {
    width: 100%;
    height: 600px;
}
</style>
