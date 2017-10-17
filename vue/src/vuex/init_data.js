export let initFlows = {
  test_flow: {
    blocks: {},
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
    imgUrl:
      "https://www.sunhome.ru/i/wallpapers/200/planeta-zemlya-kartinka.960x540.jpg",
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
