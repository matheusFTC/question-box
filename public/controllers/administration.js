"use strict";

var app = angular.module("qbApp");

app.controller("administrationController", function($rootScope, $scope, Group, Question) {

  $scope.groupsFilter;
  $scope.groups;
  $scope.group;

  $scope.findAllGroups = function() {
    Group.findAll().then(function(response) {
      $scope.groups = response.data;
    });
  };

  $scope.setGroup = function(group) {
    $scope.group = group;
  };

  $scope.newGroup = function() {
    $scope.group = {};

    $scope.group.name = "";
    $scope.group.description = "";
    $scope.group.isActive = true;
  };

  $scope.saveGroup = function() {
    Group.save($scope.group, $rootScope.token)
      .then(function(response) {
        $rootScope.message.success("Group saved successfully!");

        $scope.findAllGroups();
      })
      .catch(function(err) {
        if (err.status === 401) {
          $rootScope.message.unauthorized();
        } else {
          $rootScope.message.internalServerError();
        }
      });
  };

  $scope.removeGroup = function(group) {
    Group.remove(group._id, $rootScope.token)
      .then(function(response) {
        $rootScope.message.success("Group successfully removed!");

        $scope.findAllGroups();
      })
      .catch(function(err) {
        if (err.status === 401) {
          $rootScope.message.unauthorized();
        } else {
          $rootScope.message.internalServerError();
        }
      });
  };

  $scope.findAllGroups();
  $scope.newGroup();
});