<template>
    <div>
        <button class="ui button disable">BTN</button>
        <div id="flow"></div>
    </div>
</template>



<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import "jquery-ui";
import "jquery.flowchart/jquery.flowchart.js";
import "jquery.flowchart/jquery.flowchart.css";

export default {
    name: 'flow',
    mounted() {
        $(document).ready(function() {
            var data = {
                operators: {
                    operator: {
                        top: 20,
                        left: 20,
                        properties: {
                            title: 'Operator',
                            inputs: {
                                input_1: {
                                    label: 'Input 1',
                                },
                                input_2: {
                                    label: 'Input 2',
                                }
                            },
                            outputs: {
                                output_1: {
                                    label: 'Output 1',
                                },
                                output_2: {
                                    label: 'Output 2',
                                },
                                output_3: {
                                    label: 'Output 3',
                                }
                            }
                        }
                    }
                }
            };

            // Apply the plugin on a standard, empty div...
            $('#flow').flowchart({
                data: data
            });
        });
    }
    // computed: {
    //     ...mapState(['']),
    //     ...mapGetters([''])
    // },
    // methods: {
    //     ...mapMutations(['']),
    //     ...mapActions([''])
    // }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
