var jwt = require("jwt-simple");
var moment = require("moment");

module.exports = function(app) {
  const secret = app.parameters.authentication.secret;
  const amount = app.parameters.authentication.amount;
  const duration = app.parameters.authentication.duration;

  var encryption = app.utils.encryption;

  var User = app.models.user;

  var controller = {};

  controller.authenticate = function(req, res) {
    User.findOne({
      "username": req.body.username,
      "password": encryption.encrypt(req.body.password)
    }, function(err, user) {
      if (user) {
        var expires = moment().add(amount, duration).valueOf();

        var token = jwt.encode({
          iss: user._id,
          exp: expires
        }, secret);

        res.status(200).json({
          token: token,
          expires: expires
        });
      } else {
        res.status(401).json({
          message: "Unauthorized."
        });
      }
    });
  };

  controller.validate = function(req, res, next) {
    res.status(401);

    var token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (token) {
      try {
        var decoded = jwt.decode(token, secret);

        if (decoded.exp <= Date.now()) {
          res.json({
            message: "Access expired."
          });
        } else {
          User.findById({
            "_id": decoded.iss
          }, function(err, user) {
            if (user) {
              next();
            } else {
              res.json({
                message: "Unauthorized."
              });
            }
          });
        }
      } catch (err) {
        res.json({
          message: "Invalid token."
        });
      }
    } else {
      res.json({
        message: "No token provided."
      });
    }
  };

  return controller;
};