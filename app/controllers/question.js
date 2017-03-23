module.exports = function(app) {
  var Question = app.models.question;

  var controller = {};

  controller.findAll = function(req, res) {
    Question.find(req.query)
      .populate("alternatives")
      .populate("group")
      .exec(function(err, questions) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(questions);
        }
      });
  };

  controller.findById = function(req, res) {
    Question.findById(req.params._id)
      .populate("alternatives")
      .populate("group")
      .exec(function(err, question) {
        if (err) {
          res.status(500).json(err);
        } else {
          if (question) {
            res.status(200).json(question);
          } else {
            res.status(404).json({
              message: "Question not found."
            });
          }
        }
      });
  };

  controller.save = function(req, res) {
    var _id = req.params._id;

    var data = {
      enunciation: req.body.enunciation,
      alternatives: req.body.alternatives,
      group: req.body.group,
      isActive: req.body.isActive
    };

    if (_id) {
      Question.findByIdAndUpdate(_id, data, function(err) {
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
      var question = new Question(data);

      question.save(function(err) {
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

  controller.remove = function(req, res) {
    Question.remove({
      "_id": req.params._id
    }, function(err) {
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