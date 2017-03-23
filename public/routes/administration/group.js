"use strict";

var app = angular.module("qbApp");

app.config(function($routeProvider) {

  $routeProvider
    .when("/administration/groups", {
      templateUrl: "views/administration/group.html",
      controller: "administrationGroupController",
      resolve: {
        validation: function($rootScope, $location) {
          if (!$rootScope.token) $location.path("/authentication");
        }
      }
    })
    .when("/administration", {
      redirectTo: "/administration/groups"
    });
});