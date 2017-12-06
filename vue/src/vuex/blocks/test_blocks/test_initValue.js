'use strict';

import Block from "../blockClass"

class NewBlock extends Block {

    constructor() {
        this.block = {
            id: "initValue",
            tags: ["Test"],
            groups: ["Test"],
            title: "Инициалиатор переменной",
            description: "Инициализируются значения на сервере",
            dots: [{
                type: "output",
                name: "val",
                id: "val",
                fields: [],
                value: {
                    type: "bool",
                    default: true
                },
                uniq: false
            }]
        }
    }
}

export const NewBlock