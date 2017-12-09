block = {
    // FRONT: autogenerate for every block
    id: {
        tags: ["Test"], // NOT EXIST: tags for filtering
        groups: ["Test"], // NOT EXIST: tags for global grouping
        title: "Тест", // NOT EXIST: Titile of block
        description: "Test description", // NOT EXIST: description,
        buttons: {}, // NOT EXIST: ??????????
        layout: {}, // NOT EXIST: html layout, styles
        dots: [
            // EXIST: Array of dots
            {
                id: "%%%", // FRONT: autogenerate for every dot
                type: "input", // EXIST: type of dot [input, output]
                name: "Name test dot", // NOT EXIST: visible name
                value_name: "val_test", // EXIST
                unique: true, // NOT EXIST: is dot can in block only one default: true
                // NOT EXIST
                figure: {
                    type: "circle", // [circle, squere]
                    color: "red"
                },

                // ONLY IF MANUAL DATA
                fields: [
                    "number" // EXIST: [bool, string, number] generat inputs
                ],
                // NOT EXIST: Values checker and defaults
                value_check: {
                    type: "number", // [bool, string, number]
                    default: 0 //
                }
            }
        ],
        // FRONT EXIST!!!
        server: {
            api_version: "0.0.1", // EXIST
            host: "127.0.0.1:7777", // EXIST
            module: "Test Module Name"
                // requestOn: ["everyResponce", "onStart", "onAnyInputChange"]
        }
    }
};