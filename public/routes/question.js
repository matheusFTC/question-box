"use strict";

var app = angular.module("qbApp");

app.config(function($routeProvider) {
  $routeProvider.when("/:_groupId", {
    templateUrl: "views/question.html",
    controller: "questionController"
  });
});