module.exports = function (app) {
    var Question = app.models.question;

    var controller = {};

    controller.findAll = function (req, res) {
        Question.find({})
            .populate("alternatives")
            .populate("category")
            .exec(function (err, users) {
                res.status(200).json(users);
            });
    };

    controller.findById = function (req, res) {

    };

    controller.save = function (req, res) {

    };

    controller.remove = function (req, res) {

    };

    return controller;
};