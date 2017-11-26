export const initFlows = {
    testFlow: {
        name: "Тестовый",
        blocks: {
            first_block: {
                title: "Title First",
                buttons: [],
                dots: [{
                        type: "input",
                        figure: "circle",
                        color: "red",
                        name: "Image",
                        checkFunction: () => {},
                        id: "input_image"
                    },
                    {
                        type: "input",
                        figure: "triangle",
                        color: "red",
                        name: "Sigma",
                        checkFunction: () => {},
                        id: "input_sigma"
                    },
                    {
                        type: "input",
                        figure: "square",
                        color: "white",
                        name: "Mean",
                        checkFunction: () => {},
                        id: "input_mean"
                    },
                    {
                        type: "output",
                        figure: "circle",
                        color: "red",
                        name: "Image Very long name",
                        checkFunction: () => {},
                        id: "output_image"
                    },
                    {
                        type: "output",
                        figure: "triangle",
                        color: "red",
                        name: "Sigma",
                        checkFunction: () => {},
                        id: "output_sigma"
                    }
                ],
                imgUrl: ""
            },
            second_block: {
                title: "Title Second",
                buttons: [],
                dots: [{
                        type: "input",
                        figure: "circle",
                        color: "red",
                        name: "Image",
                        checkFunction: () => {},
                        id: "input_image"
                    },
                    {
                        type: "input",
                        figure: "triangle",
                        color: "red",
                        name: "Sigma",
                        checkFunction: () => {},
                        id: "input_sigma"
                    },
                    {
                        type: "input",
                        figure: "square",
                        color: "white",
                        name: "Mean",
                        checkFunction: () => {},
                        id: "input_mean"
                    },
                    {
                        type: "output",
                        figure: "circle",
                        color: "red",
                        name: "Image Very long name",
                        checkFunction: () => {},
                        id: "output_image"
                    },
                    {
                        type: "output",
                        figure: "triangle",
                        color: "red",
                        name: "Sigma",
                        checkFunction: () => {},
                        id: "output_sigma"
                    }
                ],
                imgUrl: ""
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

export const blocksCollection = {
    uploadFile: {
        id: "uploadFile",
        groups: ["OpenCV"],
        block: {
            title: "Загрузить файл",
            dots: [{
                type: "output",
                figure: "circle",
                color: "red",
                name: "BRG File",
                checkFunction: () => {},
                id: "file"
            }]
        },
        layout: "",
        params: {}
    },
    RGB2Grey: {
        id: "RGB2Grey",
        groups: ["OpenCV"],
        block: {
            title: "RGB -> Grey",
            dots: [{
                    type: "input",
                    figure: "circle",
                    color: "red",
                    name: "RGB File",
                    checkFunction: () => {},
                    id: "input_file"
                },
                {
                    type: "output",
                    figure: "circle",
                    color: "red",
                    name: "Grey",
                    checkFunction: () => {},
                    id: "output_file"
                }
            ]
        }
    },
    gaussBlur: {
        id: "gaussBlur",
        groups: ["OpenCV"],
        imgUrl: "https://www.sunhome.ru/i/wallpapers/200/planeta-zemlya-kartinka.960x540.jpg",
        imgBase64: "",
        block: {
            title: "Размытие Гаусса",
            dots: [{
                    type: "input",
                    figure: "circle",
                    color: "red",
                    name: "Grey File",
                    checkFunction: () => {},
                    id: "input_file"
                },
                {
                    type: "input",
                    figure: "circle",
                    color: "red",
                    name: "Sigma",
                    checkFunction: () => {},
                    id: "input_sigma"
                },
                {
                    type: "input",
                    figure: "circle",
                    color: "red",
                    name: "Mean",
                    checkFunction: () => {},
                    id: "mean_file"
                },
                {
                    type: "output",
                    figure: "circle",
                    color: "red",
                    name: "Grey",
                    checkFunction: () => {},
                    id: "output_file"
                }
            ]
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

export const initFlowId = "testFlow";