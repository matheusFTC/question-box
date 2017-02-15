module.exports = function (app) {
    var controller = app.controllers.group;
    var validate = app.controllers.authentication.validate;
    
    app.route("/groups")
        .get(controller.findAll)
        .post(validate, controller.save);

    app.route("/groups/:_id")
        .get(controller.findById)
        .put(validate, controller.save)
        .delete(validate, controller.remove);
};