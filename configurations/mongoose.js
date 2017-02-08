var mongoose = require("mongoose");

mongoose.set("debug", true);

mongoose.connection.on("connected", function () {
    console.log("[mongoose] Database connected");
});

mongoose.connection.on("disconnected", function () {
    console.log("[mongoose] Database disconnected");
});

mongoose.connection.on("error", function (err) {
    console.log("[mongoose] " + err);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;