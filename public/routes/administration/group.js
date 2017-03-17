"use strict";

var app = angular.module("qbApp");

app.config(function($routeProvider) {
  
  /*
  var validation = function($rootScope, $location) {
    if ($rootScope.token) {
      $location.path("/administration/groups");
    } else {
      $location.path("/authentication");
    }
  };
  
  resolve: {
      "validation": validation
  }
  */

  $routeProvider.when("/administration/groups", {
    templateUrl: "views/administration/group.html",
    controller: "administrationGroupController"
  });
});