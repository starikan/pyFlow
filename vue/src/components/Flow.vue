<template>
    <div id="flow">
    </div>
</template>



<script>

import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

let instance;

function flowController(self) {
    let $flow = $('#flow').flowchart({
        data: self.currFlow,
        onOperatorSelect: (blockId) => {
            self.selectBlock(blockId)
            return true;
        },
        onOperatorUnselect: () => {
            self.unSelectBlock()
            return true;
        },
        // onOperatorMouseOver: (blockId) => {
        //     self.activeBlock(blockId)
        //     return true;
        // },
        // onOperatorMouseOut: () => {
        //     self.unActiveBlock()
        //     return true;
        // },
        onOperatorMoved: (blockId, position) => {
            self.setBlockPosition({ blockId, position })
        }
    });

    self.$flow = $flow
    console.log(self)
}

export default {
    name: 'flow',
    mounted() {
        instance = this;
        $(document).ready(() => flowController(this));
        this.setFlowCenter({ top: window.innerHeight / 2, left: window.innerWidth / 2 })
    },
    computed: {
        // ...mapState(['']),
        ...mapGetters(['currFlow', 'currFlowBlocks'])
    },
    methods: {
        ...mapMutations(['setBlockPosition', 'selectBlock', 'unSelectBlock', 'activeBlock', 'unActiveBlock', 'setFlowCenter']),
        // ...mapActions([''])
    },
    watch: {
        // Add and Remove blocks on Flow
        currFlowBlocks(newVal, oldVal) {
            let added = _.difference(newVal, oldVal)
            let removed = _.difference(oldVal, newVal)

            if (added.length) {
                _.forEach(added, id => {
                    let data = _.cloneDeep(this.currFlow.operators[id])
                    instance.$flow.flowchart('createOperator', id, data);
                })
            }
        }
    }
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
