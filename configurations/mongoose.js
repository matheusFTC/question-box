var mongoose = require("mongoose");
var bluebird = require("bluebird");

mongoose.set("debug", false);

mongoose.connection.on("connected", function() {
  console.log("Database connected.");
});

mongoose.connection.on("disconnected", function() {
  console.log("Database disconnected.");
});

mongoose.connection.on("reconnected", function() {
  console.log("Database reconnected.");
});

mongoose.connection.on("error", function(err) {
  console.log("Database error: " + err);
});

mongoose.Promise = bluebird;

module.exports = mongoose;