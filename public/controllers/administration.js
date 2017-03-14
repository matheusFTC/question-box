"use strict";

var app = angular.module("qbApp");

app.controller("administrationController", function($rootScope, $scope, Group, Question) {

  /* Groups */

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

    $scope.cleanDetail();
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
        $scope.cleanDetail();

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
        $scope.cleanDetail();

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

  /* Questions */

  $scope.questionsFilter;
  $scope.questions;
  $scope.question;

  $scope.findQuestionByGroup = function(group) {
    Question.findByGroup(group._id).then(function(response) {
      $scope.group = group;

      $scope.questions = response.data;
    });
  };

  $scope.setQuestion = function(question) {
    $scope.question = question;
  };

  $scope.newQuestion = function() {
    $scope.question = {};

    $scope.question.enunciation = "";
    $scope.question.alternatives = [];
    $scope.question.group = $scope.group._id;
    $scope.question.isActive = true;
  };

  $scope.saveQuestion = function() {
    Question.save($scope.question, $scope.token)
      .then(function(response) {
        $rootScope.message.success("Question saved successfully!");

        $scope.findQuestionByGroup($scope.group);
      })
      .catch(function(err) {
        if (err.status === 401) {
          $rootScope.message.unauthorized();
        } else {
          $rootScope.message.internalServerError();
        }
      });
  };

  $scope.removeQuestion = function(question) {
    Question.remove(question._id, $rootScope.token)
      .then(function(response) {
        $rootScope.message.success("Question successfully removed!");

        $scope.findQuestionByGroup($scope.group);
      })
      .catch(function(err) {
        if (err.status === 401) {
          $rootScope.message.unauthorized();
        } else {
          $rootScope.message.internalServerError();
        }
      });
  };

  $scope.cleanDetail = function() {
    $scope.questions = null;
    $scope.question = null;
  };

  /* Init */

  $scope.findAllGroups();
  $scope.newGroup();
});