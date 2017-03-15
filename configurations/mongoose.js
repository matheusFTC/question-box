var mongoose = require("mongoose");
var bluebird = require("bluebird");

mongoose.set("debug", false);

mongoose.connection.on("connected", function() {
  console.log("Database event connected.");
});

mongoose.connection.on("disconnected", function() {
  console.log("Database event disconnected.");
});

mongoose.connection.on("reconnected", function() {
  console.log("Database event reconnected.");
});

mongoose.connection.on("error", function(err) {
  console.log("Database event error: " + err);
});

mongoose.Promise = bluebird;

module.exports = mongoose;