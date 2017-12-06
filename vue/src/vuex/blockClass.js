"use strict";

class Block {
    constructor() {
        this.block = {};
    }

    setId(id) {
        this.block = id || "id";
    }
}

export const Block