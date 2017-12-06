export default {
    timer: {
        id: "timer",
        tags: ["Test"],
        groups: ["Test"],
        title: "Таймер",
        description: "Таймер генерирующий импульс с заданным интервалом",
        dots: [{
                type: "output",
                name: "Tick",
                id: "output_tick",
                value: {
                    type: Boolean,
                    default: true
                }
            },
            {
                type: "input",
                name: "Interval, ms",
                id: "input_interval",
                html: [{
                    tag: "input",
                    params: {
                        type: "number"
                    },
                    var: "interval"
                }],
                value: {
                    type: Number,
                    default: 1000
                }
            }
        ],
        server: {
            host: "127.0.0.1:7777",
            path: "/test/timer",
            requestOn: ["everyResponce", "onStart", "onAnyInputChange"]
        }
    }
};