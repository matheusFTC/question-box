var mongoose = require("mongoose");

module.exports = function () {
    var schema = mongoose.Schema({
        answer: {
            type: String
            , required: true
        },
        isCorrect: {
            type: Boolean
        },
        isActive: {
            type: Boolean
            , required: true
            , default: true
        }
    });

    return mongoose.model("Alternative", schema);
};