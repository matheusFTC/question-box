"use strict";

var app = angular.module("qbApp");

app.config(function($routeProvider) {

  $routeProvider.when("/administration/users", {
    templateUrl: "views/administration/user.html",
    controller: "administrationUserController",
    resolve: {
      validation: function($rootScope, $location) {
        if (!$rootScope.token) $location.path("/authentication");
      }
    }
  });
});