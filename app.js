var app = require("./config/express");
var properties = require("./config/properties");

// Set port and start server.
app.listen(properties.port, function() {
    console.log("Server started on port %d...", properties.port);
});