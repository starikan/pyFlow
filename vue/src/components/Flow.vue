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
    $flow.panzoom('pan', self.flowSizes.left, self.flowSizes.top);
    $flow.panzoom().on('panzoomend', function(e, panzoom, matrix, changed) {
        if (changed) {
            self.setFlowSizes({
                top: matrix[5],
                left: matrix[4]
            })
        }
    })

    self.$flow = $flow
}

export default {
    name: 'flow',
    mounted() {
        $(document).ready(() => flowController(this));

        let top = parseFloat(localStorage.getItem('flow_top'));
        let left = parseFloat(localStorage.getItem('flow_left'));
        let zoom = parseFloat(localStorage.getItem('flow_zoom'));

        this.setFlowSizes({
            top: top,
            left: left,
            zoom: zoom,
            width: window.innerWidth,
            height: window.innerHeight,
        })
    },
    computed: {
        ...mapState(['flowSizes']),
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
