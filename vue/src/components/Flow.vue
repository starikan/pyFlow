<template>
    <div id="flow">
    </div>
</template>



<script>

import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

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

    $flow.panzoom();
    $flow.panzoom().on('panzoomend', function(e, panzoom, matrix, changed) {
        if (changed) {
            console.log(matrix[5], matrix[4])
            self.setFlowSizes({
                top: matrix[5],
                left: matrix[4]
            })
        }
    })

    self.$flow = $flow
    // console.log(self)
}

export default {
    name: 'flow',
    mounted() {
        $(document).ready(() => flowController(this));

        this.setFlowSizes({
            // TODO: сюда из localStorage положение предыдущее top и left
            width: window.innerWidth,
            height: window.innerHeight,
        })
    },
    computed: {
        // ...mapState(['']),
        ...mapGetters(['currFlow', 'currFlowBlocks'])
    },
    methods: {
        ...mapMutations(['setBlockPosition', 'selectBlock', 'unSelectBlock', 'activeBlock', 'unActiveBlock', 'setFlowSizes']),
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
                    this.$flow.flowchart('createOperator', id, data);
                })
            }

            if (removed.length) {
                _.forEach(removed, id => {
                    this.$flow.flowchart('deleteOperator', id);
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
