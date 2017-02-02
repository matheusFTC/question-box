module.exports = function (app) {
    var Category = app.models.category;

    var controller = {};

    controller.findAll = function (req, res) {
        Category.find({})
            .populate("top")
            .exec(function (err, categories) {
                res.status(200).json(categories);
            });
    };

    controller.findById = function (req, res) {
        Category.findById(req.params._id)
            .populate("top")
            .exec(function (err, category) {
                if (err) {
                    res.status(404).json({
                        success: false,
                        message: err
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: "Found category.",
                        record: category
                    });
                }
            });
    };

    controller.save = function (req, res) {

    };

    controller.remove = function (req, res) {
        Category.remove({ "_id": req.params._id }, function (err) {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: err
                });
            } else {
                res.status(203).json({
                    success: true,
                    message: "Category removed."
                });
            }
        });
    };

    return controller;
};