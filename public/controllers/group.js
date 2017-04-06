"use strict";

var app = angular.module("qbApp");

app.controller("groupController", function($scope, Group) {

  const isActive = true;

  $scope.filter;
  $scope.groups;

  $scope.findAll = function() {
    Group.findAll(isActive).then(function(response) {
      $scope.groups = response.data;
    });
  };

  $scope.findAll();
});