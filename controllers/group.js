module.exports = function (app) {
    var Group = app.models.group;

    var controller = {};

    controller.findAll = function (req, res) {
        Group.find({}).exec(function (err, categories) {
            res.status(200).json(categories);
        });
    };

    controller.findById = function (req, res) {
        Group.findById(req.params._id).exec(function (err, group) {
            if (err) {
                res.status(404).json({
                    success: false,
                    message: err
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Found group.",
                    record: group
                });
            }
        });
    };

    controller.save = function (req, res) {
        let _id = req.params._id;

        let data = {
            name: req.body.name
            , description: req.body.description
            , isActive: req.body.isActive
        };

        if (_id) {
            Group.findByIdAndUpdate(_id, data, function (err) {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        message: "Group updated successfully."
                    });
                }
            });
        } else {
            let group = new Group(data);

            group.save(function (err) {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        message: "Group created successfully.",
                        record: group
                    });
                }
            });
        }
    };

    controller.remove = function (req, res) {
        Group.remove({ "_id": req.params._id }, function (err) {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: err
                });
            } else {
                res.status(203).json({
                    success: true,
                    message: "Group removed."
                });
            }
        });
    };

    return controller;
};