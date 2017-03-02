"use strict";

var app = angular.module("qbApp");

app.controller("questionController", function($scope, $routeParams, Group, Question) {

  $scope.group;
  $scope.questions;
  $scope.question;
  $scope.currentIndex;
  $scope.numberOfQuestions;
  $scope.numberOfQuestionsAnswered;
  $scope.numberOfQuestionsNotAnswered;
  $scope.numberOfErrors;
  $scope.numberOfHits;

  $scope.showGroupDescription = true;
  $scope.showQuestions = false;
  $scope.showResult = false;

  $scope.findGroup = function() {
    Group.findById($routeParams._groupId).then(function(response) {
      $scope.group = response.data.record;
    });
  };

  $scope.findQuestions = function() {
    Question.findByGroup($routeParams._groupId).then(function(response) {
      $scope.questions = response.data;
      $scope.numberOfQuestions = $scope.questions.length;

      const alphabet = ["A", "B", "C", "D", "E", "F", "G", "I", "J", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Z"];

      $scope.questions.forEach(function(question, index) {
        question.order = ++index;
        question.isAnswered = false;
        question.markedForReview = false;

        question.alternatives.forEach(function(alternative, index) {
          alternative.order = alphabet[index];
          alternative.isMarked = false;
        });
      });
    });
  };

  $scope.start = function() {
    $scope.showGroupDescription = false;
    $scope.showQuestions = true;
    $scope.showResult = false;

    $scope.toNext();
  };

  $scope.mark = function(alternative) {
    alternative.isMarked = !alternative.isMarked;
  };

  $scope.toPrevious = function() {
    if ($scope.currentIndex === undefined || $scope.currentIndex === null || $scope.currentIndex === 0) {
      $scope.currentIndex = $scope.questions.length - 1;
    } else {
      $scope.currentIndex--;
    }

    $scope.question = $scope.questions[$scope.currentIndex];
  };

  $scope.toNext = function() {
    if ($scope.currentIndex === undefined || $scope.currentIndex === null || $scope.currentIndex === ($scope.questions.length - 1)) {
      $scope.currentIndex = 0;
    } else {
      $scope.currentIndex++;
    }

    $scope.question = $scope.questions[$scope.currentIndex];
  };

  $scope.markForReview = function() {
    $scope.question.markedForReview = !$scope.question.markedForReview;
  };

  $scope.finalize = function() {
    $scope.questions.forEach(function(question, index) {
      var wasAnswered = false;

      question.alternatives.forEach(function(alternative) {
        if (alternative.isMarked) {
          wasAnswered = true;
        }
      });

      question.isAnswered = wasAnswered;
    });
  };

  $scope.checkResult = function() {
    $scope.numberOfQuestionsAnswered = 0;
    $scope.numberOfQuestionsNotAnswered = 0;
    $scope.numberOfErrors = 0;
    $scope.numberOfHits = 0;

    $scope.questions.forEach(function(question, index) {
      if (question.isAnswered) {
        $scope.numberOfQuestionsAnswered++;

        var check = question.alternatives.filter(function(alternative) {
          return alternative.isMarked && !alternative.isCorrect;
        }).length;

        if (check === 0) {
          $scope.numberOfHits++;
        } else {
          $scope.numberOfErrors++;
        }
      } else {
        $scope.numberOfQuestionsNotAnswered++;
        $scope.numberOfErrors++;
      }
    });

    $scope.showGroupDescription = false;
    $scope.showQuestions = false;
    $scope.showResult = true;
  };

  $scope.reset = function() {
    $scope.showQuestions = true;
    $scope.showResult = false;
    $scope.currentIndex = undefined;

    $scope.questions.forEach(function(question, index) {
      question.isAnswered = false;
      question.markedForReview = false;

      question.alternatives.forEach(function(alternative, index) {
        alternative.isMarked = false;
      });
    });
    
    $scope.toNext();
  };

  $scope.findGroup();
  $scope.findQuestions();
});