module.exports = function (app) {
    var controller = app.controllers.group;
    
    app.route("/groups")
        .get(controller.findAll)
        .post(controller.save);

    app.route("/groups/:_id")
        .get(controller.findById)
        .put(controller.save)
        .delete(controller.remove);
};