<template>
    <div id="leftpanel">
        <div class="ui container">
            <p>OpenCV</p>
            <button class="ui button" @click="addBlock('uploadFile')">Upload Image</button>
            <button class="ui button" @click="addBlock('RGB2Grey')">RGB2Grey</button>
            <hr>
            <button class="ui button" @click="deleteBlock()">Delete Block</button>
            <button class="ui button">Save Flow</button>
            <select class="ui fluid dropdown">
                <option value="">Select Flow</option>
                <option value="1">Select Flow 1</option>
                <option value="2">Select Flow 2</option>
            </select>
        </div>
    </div>
</template>



<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: 'left-panel',
    computed: {
        // ...mapState(['count',]),
        // ...mapGetters(['countPlus10',])
    },
    methods: {
        ...mapMutations(['addBlock', 'deleteBlock']),
        // ...mapActions({ incrementAsync: 'increment' })
    }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#leftpanel {
    height: 100%;
    width: 150px;
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: #FFFF99
}
</style>
