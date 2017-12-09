"use strict";

import io from "socket.io-client";
import _ from "lodash";

class Sockets {
    constructor() {
        if (!Sockets.instance) {
            this.sockets = {};
            Sockets.instance = this;
        }
        return Sockets.instance;
    }

    addSocket(server) {
        if (!_.isObject(server) || !server.id || !server.host || this.sockets[server.id]) {
            return;
        }

        const socket = io("ws://" + server.host);

        socket.on("connect", () => {
            this.sockets[server.id] = socket;
        });
    }

    removeSocket(id) {
        delete this.sockets[id];
    }

    addEvent(id, evtName, func) {
        if (!this.sockets[id]) {
            return;
        }
        this.sockets[id].on(event, func);
    }
}

const instance = new Sockets();
Object.freeze(instance);

export default instance;