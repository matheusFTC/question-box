var mongoose = require("mongoose");

module.exports = function () {
    var schema = mongoose.Schema({
        name: {
            type: String
            , required: true
            , index: {
                unique: true
            }
        },
        isActive: {
            type: Boolean
            , required: true
            , default: true
        }
    });

    return mongoose.model("Group", schema);
};