"use strict";

var app = angular.module("qbApp");

app.config(function($routeProvider) {

  $routeProvider.when("/administration/groups/:_groupId/questions", {
    templateUrl: "views/administration/question.html",
    controller: "administrationQuestionController",
    resolve: {
      validation: function($rootScope, $location) {
        if (!$rootScope.token) $location.path("/authentication");
      }
    }
  });
});