module.exports = function (app) {
    var controller = app.controllers.question;

    app.route("/questions")
        .get(controller.findAll)
        .post(controller.save);

    app.route("/questions/:_id")
        .get(controller.findById)
        .put(controller.save)
        .delete(controller.remove);
};