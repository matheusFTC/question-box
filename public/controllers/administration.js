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

    $scope.cleanGroupsChildren();
  };

  $scope.newGroup = function() {
    $scope.group = {};

    $scope.group.name = "";
    $scope.group.description = "";
    $scope.group.isActive = true;
    
    $scope.cleanGroupsChildren();
  };

  $scope.saveGroup = function() {
    Group.save($scope.group, $rootScope.token)
      .then(function(response) {
        $scope.cleanGroupsChildren();

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
        $scope.cleanGroupsChildren();

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

    $scope.cleanQuestionsChildren();
  };

  $scope.newQuestion = function() {
    $scope.question = {};

    $scope.question.enunciation = "";
    $scope.question.alternatives = [];
    $scope.question.group = $scope.group._id;
    $scope.question.isActive = true;
    
    $scope.cleanQuestionsChildren();
  };

  $scope.saveQuestion = function() {
    Question.save($scope.question, $scope.token)
      .then(function(response) {
        $scope.cleanQuestionsChildren();

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
        $scope.cleanQuestionsChildren();

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

  /* Alternatives */

  $scope.alternativesFilter;
  $scope.alternatives;
  $scope.alternative;

  $scope.showAlternatives = function(question) {
    $scope.question = question;
    $scope.alternatives = question.alternatives;
  };

  $scope.setAlternative = function(alternative) {
    $scope.alternative = alternative;
  };

  $scope.newAlternative = function() {
    $scope.alternative = {};

    $scope.alternative.answer = "";
    $scope.alternative.isCorrect = false;
  };

  $scope.saveAlternative = function() {

  };

  $scope.removeAlternative = function(alternative) {

  };

  $scope.cleanGroupsChildren = function() {
    $scope.questions = null;
    $scope.question = null;

    $scope.cleanQuestionsChildren();
  };

  $scope.cleanQuestionsChildren = function() {
    $scope.alternatives = null;
    $scope.alternative = null;
  };

  /* Init */

  $scope.findAllGroups();
  $scope.newGroup();
});