export let initFlows = {
    testFlow: {
        blocks: {
            first_block: {
                title: "Заголовок",
                buttons: [],
                inputs: [{
                        type: "circle",
                        color: "red",
                        name: "Image",
                        checkFunction: () => {},
                        id: "input_image"
                    },
                    {
                        type: "triangle",
                        color: "red",
                        name: "Sigma",
                        checkFunction: () => {},
                        id: "input_sigma"
                    },
                    {
                        type: "square",
                        color: "white",
                        name: "Mean",
                        checkFunction: () => {},
                        id: "input_mean"
                    }
                ],
                outputs: [{
                        type: "circle",
                        color: "red",
                        name: "Image Very long name",
                        checkFunction: () => {},
                        id: "input_image"
                    },
                    {
                        type: "triangle",
                        color: "red",
                        name: "Sigma",
                        checkFunction: () => {},
                        id: "input_sigma"
                    }
                ],
                imgUrl: ""
            },
            second_block: {
                title: "Заголовок 2",
                buttons: [],
                inputs: [{
                        type: "circle",
                        color: "red",
                        name: "Image",
                        checkFunction: () => {},
                        id: "input_image"
                    },
                    {
                        type: "triangle",
                        color: "red",
                        name: "Sigma",
                        checkFunction: () => {},
                        id: "input_sigma"
                    },
                    {
                        type: "square",
                        color: "white",
                        name: "Mean",
                        checkFunction: () => {},
                        id: "input_mean"
                    }
                ],
                outputs: [{
                        type: "circle",
                        color: "red",
                        name: "Image Very long name",
                        checkFunction: () => {},
                        id: "input_image"
                    },
                    {
                        type: "triangle",
                        color: "red",
                        name: "Sigma",
                        checkFunction: () => {},
                        id: "input_sigma"
                    }
                ],
                imgUrl: ""
            }
        },
        links: {}
    }
};

export let blocks = {
    uploadFile: {
        name: "uploadFile",
        groups: ["OpenCV"],
        block: {
            properties: {
                title: "Загрузить файл",
                inputs: {},
                outputs: {
                    file: {
                        label: "BRG File"
                    }
                }
            }
        },
        layout: "",
        params: {}
    },
    RGB2Grey: {
        name: "RGB2Grey",
        groups: ["OpenCV"],
        block: {
            properties: {
                title: "RGB -> Grey",
                inputs: {
                    in_file: {
                        label: "RGB File"
                    }
                },
                outputs: {
                    out_file: {
                        label: "Grey"
                    }
                }
            }
        }
    },
    gaussBlur: {
        name: "gaussBlur",
        groups: ["OpenCV"],
        imgUrl: "https://www.sunhome.ru/i/wallpapers/200/planeta-zemlya-kartinka.960x540.jpg",
        imgBase64: "",
        block: {
            properties: {
                title: "Размытие Гаусса",
                inputs: {
                    file: {
                        label: "Grey File"
                    },
                    sigma: {
                        label: "Sigma"
                    },
                    mean: {
                        label: "Mean"
                    }
                },
                outputs: {
                    file: {
                        label: "File"
                    }
                }
            }
        },
        layout: "",
        params: {
            sigma: {
                input: {},
                type: Number,
                default: 0.1
            },
            mean: {
                input: {},
                type: Number,
                default: 1
            }
        },
        server: {}
    }
};