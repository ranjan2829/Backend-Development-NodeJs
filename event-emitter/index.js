const EventEmitter = require("events");

const first = new EventEmitter();
first.on('greet', (name) => {
    console.log(`hellowww ${name}`);
});
first.emit('greet', "ranjan");
