<template>
    <div>
        <div id="flow"></div>
    </div>
</template>



<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

var data = {};

export default {
    name: 'flow',
    mounted() {
        self = this
        $(document).ready(function() {
            $('#flow').flowchart({
                data: self.currFlowData
            });
        });
    },
    computed: {
        // ...mapState(['']),
        ...mapGetters(['currFlowData'])
    },
    // methods: {
    //     ...mapMutations(['']),
    //     ...mapActions([''])
    // }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#flow {
    width: 100%;
    height: 600px;
}
</style>
