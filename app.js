var app = require("./configurations/express");
var mongoose = require("./configurations/mongoose");

// Create the connection to the database.
mongoose.connect(app.parameters.database.url, app.parameters.database.options, function(err) {
  if (err) {
    console.log(err);  
  } else {
    console.log("Connection with database established without errors.");
  }
});

// Close the connection to the database when the server is stopped.
process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    process.exit(0);
  });
});

// Set port and start server.
app.listen(app.parameters.infrastructure.port);