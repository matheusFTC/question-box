var app = require("./config/express");

const port = app.parameters.infrastructure.port;

// Set port and start server.
app.listen(port, function() {
    console.log("Server started on port %d...", port);
});