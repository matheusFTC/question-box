module.exports = function (app) {
    var controller = app.controllers.category;
    var validate = app.controllers.authentication.validate;

    app.route("/categories")
        .get(controller.findAll)
        .post(validate, controller.save);

    app.route("/categories/:_id")
        .get(controller.findById)
        .put(validate, controller.save)
        .delete(validate, controller.remove);
};