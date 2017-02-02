module.exports = function (app) {
    var encryption = app.utils.encryption;

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
        let _id = req.params._id;

        let data = {
            username: req.body.username
            , password: encryption.encrypt(req.body.password)
            , fullname: req.body.fullname
        };

        if (_id) {
            User.findByIdAndUpdate(_id, data, function (err) {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        message: "User updated successfully."
                    });
                }
            });
        } else {
            let user = new User(data);

            user.save(function (err) {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: err
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        message: "User created successfully.",
                        record: user
                    });
                }
            });
        }
    };

    controller.remove = function (req, res) {
        User.remove({ "_id": req.params._id }, function (err) {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: err
                });
            } else {
                res.status(203).json({
                    success: true,
                    message: "User removed."
                });
            }
        });
    };

    return controller;
};