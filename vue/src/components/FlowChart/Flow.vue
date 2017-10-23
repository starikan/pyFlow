<template>
    <div id="flow">
        <div class="flow-block ui segment" v-for="(block, key) in flowCurr.blocks">

            <!-- TITLE -->
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

            <!-- Inputs/Outputs -->
            <div class="flow-block-main ui two columns divided grid">
                <div class="row">
                    <!-- Inputs -->
                    <div class="flow-block-main-inputs column">
                        <div class="ui sixteen columns grid">
                            <div class="row" v-for="input in block.inputs">
                                <div class="flow-block-main-inputs-dot column">
                                    <i class="bullseye icon"></i>
                                </div>
                                <div class="flow-block-main-inputs-data column">
                                    {{input.name}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Outputs -->
                    <div class="flow-block-main-outputs column">
                        <div class="ui sixteen columns grid">
                            <div class="row" v-for="output in block.outputs">
                                <div class="fourteen wide column">
                                    {{output.name}}
                                </div>
                                <div class="flow-block-main-inputs-dot column">
                                    <i class="bullseye icon"></i>
                                </div>
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
    mounted() {

        $(document).ready(() => {
            $('#flow').on('mousedown touchstart', function(e) {
                e.stopImmediatePropagation();
            });
            $(".flow-block").panzoom();
            $("#flow").panzoom();

        });

    },
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
    border-color: black;

    /* width: 250px; */
    /* height: 100px; */
}

.flow-block-title {
    font-size: 28px;
    /* padding: 5px; */
    background-color: magenta;
}

.flow-block-title-title {}

.flow-block-title-buttons {}

.flow-block-main {}

.flow-block-main-inputs .row {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
}

.flow-block-main-inputs-dot {
    /* padding: 5px !important; */
}

.flow-block-main-inputs-data {
    /* padding: 5px !important; */
}

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
