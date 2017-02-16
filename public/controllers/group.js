"use strict";

var app = angular.module("qbApp");

app.controller("groupController", function($scope, Group) {

  $scope.filter;
  $scope.groups;

  $scope.findAll = function() {
    Group.findAll().then(function(response) {
      $scope.groups = response.data;
    });
  };

  $scope.findAll();
});