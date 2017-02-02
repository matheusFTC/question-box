module.exports = function (app) {
    var Alternative = app.models.alternative;

    var controller = {};

    controller.findAll = function (req, res) {
        Alternative.find({}, function (err, alternatives) {
            res.status(200).json(alternatives);
        });
    };

    controller.findById = function (req, res) {
        Alternative.findById(req.params._id, function (err, alternative) {
            if (err) {
                res.status(404).json({
                    success: false,
                    message: err
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Found alternative.",
                    record: alternative
                });
            }
        });
    };

    controller.save = function (req, res) {
        let _id = req.params._id;

        let data = {
            answer: req.body.answer
            , isCorrect: req.body.isCorrect
            , isActive: req.body.isActive
        };

        if (_id) {
            Alternative.findByIdAndUpdate(_id, data, function (err) {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        message: "Alternative updated successfully."
                    });
                }
            });
        } else {
            let alternative = new Alternative(data);

            alternative.save(function (err) {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        message: "Alternative created successfully.",
                        record: alternative
                    });
                }
            });
        }
    };

    controller.remove = function (req, res) {
        Alternative.remove({ "_id": req.params._id }, function (err) {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: err
                });
            } else {
                res.status(203).json({
                    success: true,
                    message: "Alternative removed."
                });
            }
        });
    };

    return controller;
};