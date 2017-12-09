export const initFlows = {
    testFlow: {
        name: "Тестовый",
        blocks: {
            first_block: {
                title: "Title First",
                dots: {
                    input_image: {
                        type: "input",
                        name: "Image",
                        id: "input_image"
                    },
                    input_sigma: {
                        type: "input",
                        name: "Sigma",
                        id: "input_sigma"
                    },
                    input_mean: {
                        type: "input",
                        name: "Mean",
                        id: "input_mean"
                    },
                    output_image: {
                        type: "output",
                        name: "Image Very long name",
                        id: "output_image"
                    },
                    output_sigma: {
                        type: "output",
                        name: "Sigma",
                        id: "output_sigma"
                    }
                }
            },
            second_block: {
                title: "Title Second",
                dots: {
                    input_image: {
                        type: "input",
                        name: "Image",
                        id: "input_image"
                    },
                    input_sigma: {
                        type: "input",
                        name: "Sigma",
                        id: "input_sigma"
                    },
                    input_mean: {
                        type: "input",
                        name: "Mean",
                        id: "input_mean"
                    },
                    output_image: {
                        type: "output",
                        name: "Image Very long name",
                        id: "output_image"
                    },
                    output_sigma: {
                        type: "output",
                        name: "Sigma",
                        id: "output_sigma"
                    }
                }
            }
        },
        links: {
            id1: {
                output: {
                    blockId: "first_block",
                    dotId: "output_image"
                },
                input: {
                    blockId: "second_block",
                    dotId: "input_image"
                },
                style: {}
            }
        }
    }
};

export const initFlowId = "testFlow";

export const initServersAPI = {
    local_python: {
        host: "127.0.0.1:8765"
    }
};