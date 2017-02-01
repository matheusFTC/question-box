module.exports = function (app) {
    var User = app.models.user;

    var controller = {};

    controller.findAll = function (req, res) {
        User.find({}, function (err, users) {
            res.status(200).json(users);
        });
    };

    controller.findById = function (req, res) {
        User.findById(req.params._id, function (err, user) {
            if (err) {
                res.status(404).json({
                    success: false,
                    message: err
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Found user.",
                    record: user
                });
            }
        });
    };

    controller.save = function (req, res) {

    };

    controller.remove = function (req, res) {

    };

    return controller;
};