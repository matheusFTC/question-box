var mongoose = require("mongoose");

module.exports = function () {
    var schema = mongoose.Schema({
        name: {
            type: String
            , required: true
        },
        top: {
            type: mongoose.Schema.Types.ObjectId
            , ref: "Category"
        },
        isActive: {
            type: Boolean
            , required: true
            , default: true
        }
    });

    return mongoose.model("Category", schema);
};