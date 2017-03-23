"use strict";

var app = angular.module("qbApp");

app.config(function($routeProvider) {

  $routeProvider
    .when("/administration/groups", {
      templateUrl: "views/administration/group.html",
      controller: "administrationGroupController"
    })
    .when("/administration", {
      redirectTo: "/administration/groups"
    });
});