<template>
    <div id="flow">
    </div>
</template>



<script>

import _ from "lodash";
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import shortid from "shortid";
import lstore from "store";

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
        },
        onLinkCreate(linkId, linkData) {
            let allLinksIds = Object.keys(self.currFlow.links)

            if (allLinksIds.includes(linkId)) {
                return true;
            }
            else {
                let linkId = `link_${shortid.generate()}`;
                self.addLink({ linkId, linkData })
                this.createLink(linkId, linkData)
            }
        },
        onLinkDelete(linkId) {
            self.deleteLink({ linkId })
            return true;
        },
        onLinkSelect(linkId) {
            self.selectLink(linkId)
            return true;
        },
        onLinkUnselect() {
            self.unSelectLink()
            return true;
        },
        onAfterChange(evt) {
            self.update$flowData({ event: evt, data: this.getData() })
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

        let flowSizes = lstore.get("flowSizes");
        flowSizes.width = window.innerWidth;
        flowSizes.height = window.innerHeight;
        this.setFlowSizes(flowSizes)

        let flows = lstore.get("flows");
        let currFlowId = lstore.get("currFlowId");
        this.setFlows(flows)
        this.setCurrFlowId(currFlowId)

    },
    computed: {
        ...mapState(['flowSizes', "$flowData"]),
        ...mapGetters(['currFlow', 'currFlowBlocks', 'currFlowLinks'])
    },
    methods: {
        ...mapMutations(['setBlockPosition', 'selectBlock', 'unSelectBlock', 'activeBlock', 'unActiveBlock', 'setFlowSizes', 'addLink', 'deleteLink', 'selectLink', 'unSelectLink', 'update$flowData', 'setFlows',
            'setCurrFlowId']),
        // ...mapActions([''])
    },
    watch: {
        // Add and Remove blocks on Flow
        currFlowBlocks(newVal, oldVal) {
            let added = _.difference(newVal, oldVal)
            let removed = _.difference(oldVal, newVal)

            if (added.length) {
                _.forEach(added, id => {
                    try {
                        let data = _.cloneDeep(this.currFlow.operators[id])
                        this.$flow.flowchart('createOperator', id, data);
                    }
                    catch (err) { }
                })
            }

            if (removed.length) {
                _.forEach(removed, id => {
                    this.$flow.flowchart('deleteOperator', id);
                })
            }
        },
        currFlowLinks(newVal, oldVal) {
            let removed = _.difference(oldVal, newVal)

            if (removed.length) {
                _.forEach(removed, id => {
                    // without try error when link automaticaly delete from flow
                    // i.e. onelink to input
                    try {
                        this.$flow.flowchart('deleteLink', id);
                    }
                    catch (err) { }
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
