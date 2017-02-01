module.exports = function (app) {
    var controller = app.controllers.alternative;

    app.route("/alternatives")
        .get(controller.findAll)
        .post(controller.save);

    app.route("/alternatives/:_id")
        .get(controller.findById)
        .put(controller.save)
        .delete(controller.remove);
}