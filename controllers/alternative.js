module.exports = function (app) {
    var Alternative = app.models.alternative;

    var controller = {};

    controller.findAll = function (req, res) {
        Alternative.find({}, function (err, alternatives) {
            res.status(200).json(alternatives);
        });
    };

    controller.findById = function (req, res) {

    };

    controller.save = function (req, res) {

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