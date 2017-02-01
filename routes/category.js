module.exports = function (app) {
    var controller = app.controllers.category;

    app.route("/categories")
        .get(controller.findAll)
        .post(controller.save);

    app.route("/categories/:_id")
        .get(controller.findById)
        .put(controller.save)
        .delete(controller.remove);
};