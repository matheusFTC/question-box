module.exports = function(app) {
  var controller = app.controllers.question;
  var validate = app.controllers.authentication.validate;

  app.route("/questions")
    .get(controller.findAll)
    .post(validate, controller.save);

  app.route("/questions/:_id")
    .get(controller.findById)
    .put(validate, controller.save)
    .delete(validate, controller.remove);
};