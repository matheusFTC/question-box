module.exports = function(app) {
  var Group = app.models.group;

  var controller = {};

  controller.findAll = function(req, res) {
    Group.find(req.query).exec(function(err, groups) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(groups);
      }
    });
  };

  controller.findById = function(req, res) {
    Group.findById(req.params._id).exec(function(err, group) {
      if (err) {
        res.status(500).json(err);
      } else {
        if (group) {
          res.status(200).json(group);
        } else {
          res.status(404).json({
            message: "Group not found."
          });
        }
      }
    });
  };

  controller.save = function(req, res) {
    var _id = req.params._id;

    var data = {
      name: req.body.name,
      description: req.body.description,
      isActive: req.body.isActive
    };

    if (_id) {
      Group.findByIdAndUpdate(_id, data, function(err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(201).json({
            message: "Group updated successfully."
          });
        }
      });
    } else {
      var group = new Group(data);

      group.save(function(err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(201).json(group);
        }
      });
    }
  };

  controller.remove = function(req, res) {
    Group.remove({
      "_id": req.params._id
    }, function(err) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(203).json({
          message: "Group removed."
        });
      }
    });
  };

  return controller;
};