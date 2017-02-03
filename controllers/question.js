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
        let _id = req.params._id;

        let data = {
            enunciation: req.body.enunciation
            , alternatives: req.body.alternatives
            , category: req.body.category
            , isActive: req.body.isActive
        };

        if (_id) {
            Question.findByIdAndUpdate(_id, data, function (err) {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        message: "Question updated successfully."
                    });
                }
            });
        } else {
            let question = new Question(data);

            question.save(function (err) {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        message: "Question created successfully.",
                        record: question
                    });
                }
            });
        }
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