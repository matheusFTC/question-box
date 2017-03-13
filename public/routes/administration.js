"use strict";

var app = angular.module("qbApp");

app.config(function($routeProvider) {
  $routeProvider.when("/administration", {
    templateUrl: "views/administration.html",
    controller: "administrationController",
    resolve: {
      "validation": function($rootScope, $location) {
        if ($rootScope.token) {
          $location.path("/administration");
        } else {
          $location.path("/authentication");
        }
      }
    }
  });
});