var bodyParser = require("body-parser");
var cors = require("cors");
var express = require("express");
var load = require("express-load");
var methodOverride = require("method-override");

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static("./public"));
app.use(methodOverride());

// It hides the technology used by server.
app.disable("x-powered-by");

load("parameters", {
    cwd: 'app'
  })
  .then("utils")
  .then("models")
  .then("controllers")
  .then("routes")
  .into(app);

// Catch all 404 not found error.
app.use(function(req, res, next) {
  res.status(404).json({
    success: false,
    message: "Resource not found."
  });
});

// Catch all 500 internal server error.
app.use(function(err, req, res, next) {
  res.status(500).json({
    success: false,
    message: "Internal server error."
  });
})

module.exports = app;