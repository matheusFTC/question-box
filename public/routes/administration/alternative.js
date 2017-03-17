"use strict";

var app = angular.module("qbApp");

app.config(function($routeProvider) {
  
  $routeProvider.when("/administration/groups/:_groupId/questions/:_questionId/alternatives", {
    templateUrl: "views/administration/alternative.html",
    controller: "administrationAlternativeController"
  });
});