"use strict";

var app = angular.module("qbApp");

app.config(function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "views/group.html",
    controller: "groupController"
  });

  $routeProvider.otherwise({
    redirectTo: "/"
  });
});