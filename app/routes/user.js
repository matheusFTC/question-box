module.exports = function(app) {
  var controller = app.controllers.user;
  var validate = app.controllers.authentication.validate;

  app.route("/users")
    .get(validate, controller.findAll)
    .post(validate, controller.save);

  app.route("/users/:_id")
    .get(validate, controller.findById)
    .put(validate, controller.save)
    .delete(validate, controller.remove);
};