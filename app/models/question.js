var mongoose = require("mongoose");

module.exports = function() {
  var schema = mongoose.Schema({
    enunciation: {
      type: String,
      required: true
    },
    alternatives: [{
      answer: {
        type: String,
        required: true
      },
      isCorrect: {
        type: Boolean
      }
    }],
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group"
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true
    }
  });

  return mongoose.model("Question", schema);
};