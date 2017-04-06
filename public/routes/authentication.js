"use strict";

var app = angular.module("qbApp");

app.config(function($routeProvider) {

  $routeProvider.when("/authentication", {
    templateUrl: "views/authentication.html",
    controller: "authenticationController",
    resolve: {
      clear: function($cookies) {
        $cookies.put("token", undefined);
      }
    }
  });
});