export let initFlows = {
  test_flow: {
    operators: {
      operator1: {
        top: 20,
        left: 20,
        properties: {
          title: "Operator 1",
          inputs: {},
          outputs: {
            output_1: {
              label: "Output 1"
            }
          }
        }
      },
      operator2: {
        top: 80,
        left: 300,
        properties: {
          title: "Operator 2",
          inputs: {
            input_1: {
              label: "Input 1"
            },
            input_2: {
              label: "Input 2"
            }
          },
          outputs: {}
        }
      }
    },
    links: {
      link_1: {
        fromOperator: "operator1",
        fromConnector: "output_1",
        toOperator: "operator2",
        toConnector: "input_2"
      }
    }
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
    }
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
  }
};
