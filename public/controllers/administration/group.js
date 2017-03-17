"use strict";

var app = angular.module("qbApp");

app.controller("administrationGroupController", function($scope, Group) {

  $scope.filter;
  $scope.groups;
  $scope.group;

  $scope.findAll = function() {
    Group.findAll().then(function(response) {
      $scope.groups = response.data;
    });
  };

  $scope.set = function(group) {
    $scope.group = group;
  };

  $scope.new = function() {
    $scope.group = {};

    $scope.group.name = "";
    $scope.group.description = "";
    $scope.group.isActive = true;
  };

  $scope.save = function() {
    Group.save($scope.group, $scope.token)
      .then(function(response) {
        $scope.message.success("Group saved successfully!");

        $scope.findAll();
      })
      .catch(function(err) {
        if (err.status === 401) {
          $scope.message.unauthorized();
        } else {
          $scope.message.internalServerError();
        }
      });
  };

  $scope.remove = function(group) {
    Group.remove(group._id, $scope.token)
      .then(function(response) {
        $scope.message.success("Group successfully removed!");

        $scope.findAll();
      })
      .catch(function(err) {
        if (err.status === 401) {
          $scope.message.unauthorized();
        } else {
          $scope.message.internalServerError();
        }
      });
  };

  $scope.findAll();
});