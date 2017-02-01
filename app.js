var app = require("./config/express");
var database = require("./config/mongoose");

// Create the connection to the database.
database.connect(app.parameters.database.url, app.parameters.database.options);

// Close the connection to the database when the server is stopped.
process.on("SIGINT", function () {
    database.connection.close(function () {
        process.exit(0);
    });
});

// Set port and start server.
app.listen(app.parameters.infrastructure.port);