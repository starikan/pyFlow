<template>
    <div id="flow">
        <div class="flow-block ui segment" v-for="(block, key) in flowCurr.blocks">

            <div class="flow-block-title ui two columns grid">
                <div class="stretched row">
                    <div class="column">
                        <div class="flow-block-title-title">{{block.title}}</div>
                    </div>
                    <div class="column">
                        <div class="flow-block-title-buttons"></div>
                    </div>
                </div>
            </div>

            <div class="flow-block-main ui two columns divided grid">
                <div class="stretched row">
                    <div class="flow-block-main-inputs column">
                        <div class="ui list">
                            <div class="item" v-for="input in block.inputs">
                                <i class="bullseye icon"></i>
                                <div class="content">
                                    {{input.name}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flow-block-main-outputs column">
                        <div class="ui list">
                            <div class="item" v-for="output in block.outputs">
                                <div class="content middle aligned">
                                    {{output.name}}
                                </div>
                                <i class="bullseye icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
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
        ...mapState([
            'flow'
        ]),
        ...mapGetters([
            'flowCurr'
        ])
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
    font-family: 'Open Sans Condensed', sans-serif;
}

.flow-block {
    position: absolute;
    top: 50px;
    left: 50px;
    /* width: 350px; */
    /* height: 100px; */
}

.flow-block-title {
    font-size: 28px;
    /* padding: 5px; */
    /* background-color: white; */
}

.flow-block-title-title {}

.flow-block-title-buttons {}

.flow-block-main {
    /* background-color: red; */
}

.flow-block-main-inputs {}

.flow-block-main-outputs {}

.flow-block-image {
    background-color: blue;
}

.flow-block-extend {}
</style>
