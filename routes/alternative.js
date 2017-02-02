module.exports = function (app) {
    var controller = app.controllers.alternative;
    var validate = app.controllers.authentication.validate;

    app.route("/alternatives")
        .get(controller.findAll)
        .post(validate, controller.save);

    app.route("/alternatives/:_id")
        .get(controller.findById)
        .put(validate, controller.save)
        .delete(validate, controller.remove);
};