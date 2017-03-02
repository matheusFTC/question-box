var mongoose = require("mongoose");

mongoose.set("debug", false);

mongoose.connection.on("connected", function () {
    console.log("Database connected.");
});

mongoose.connection.on("disconnected", function () {
    console.log("Database disconnected.");
});

mongoose.connection.on("error", function (err) {
    console.log("Database error: " + err);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;