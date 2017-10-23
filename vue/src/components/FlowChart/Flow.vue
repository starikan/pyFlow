<template>
    <div id="flow">
        <div class="fb" v-for="(block, key) in flowCurr.blocks">

            <table class="fb-title">
                <tbody>
                    <tr>
                        <td>{{block.title}}</td>
                        <td>
                            <div class="flow-block-title-buttons"></div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table class="fb-main">
                <tbody>
                    <tr>
                        <td>
                            <table class="fb-inputs">
                                <tbody>
                                    <tr v-for="input in block.inputs">
                                        <td>
                                            <i class="bullseye icon"></i>
                                        </td>
                                        <td>
                                            {{input.name}}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <table class="fb-outputs">
                                <tbody>
                                    <tr v-for="output in block.outputs">
                                        <td>
                                            {{output.name}}
                                        </td>
                                        <td>
                                            <i class="bullseye icon"></i>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>

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
            $(".fb").panzoom();
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

.fb {
    position: absolute;
    top: 50px;
    left: 50px;
    border-color: black;
    background-color: black;
    /* width: 250px; */
    /* height: 100px; */
}

.fb-title {
    font-size: 28px;
    padding: 5px;
    width: 100%;
    background-color: magenta;
}

.fb-main {
    /* font-size: 28px; */
    padding: 5px;
    width: 100%;
    background-color: green;
}

.fb-main td {
    vertical-align: top;
}

.fb-inputs {}

.fb-outputs {
    text-align: right;
}
</style>
