module.exports = function (app) {
    var Question = app.models.question;

    var controller = {};

    controller.findAll = function (req, res) {
        Question.find({})
            .populate("alternatives")
            .populate("category")
            .exec(function (err, questions) {
                res.status(200).json(questions);
            });
    };

    controller.findById = function (req, res) {
        Question.findById(req.params._id)
            .populate("alternatives")
            .populate("category")
            .exec(function (err, question) {
                if (err) {
                    res.status(404).json({
                        success: false,
                        message: err
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: "Found question.",
                        record: question
                    });
                }
            });
    };

    controller.save = function (req, res) {

    };

    controller.remove = function (req, res) {
        Question.remove({ "_id": req.params._id }, function (err) {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: err
                });
            } else {
                res.status(203).json({
                    success: true,
                    message: "Question removed."
                });
            }
        });
    };

    return controller;
};