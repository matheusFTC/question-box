"use strict";

var app = angular.module("qbApp");

app.controller("questionController", function($scope, $routeParams, Group, Question) {

  $scope.group;
  $scope.questions;
  $scope.question;
  $scope.currentIndex;
  $scope.numberOfQuestions;
  $scope.started;

  Group.findById($routeParams._groupId).then(function(response) {
    $scope.group = response.data.record;
  });

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

  $scope.start = function() {
    this.started = true;
    this.toNext();
  };

  $scope.mark = function(alternative) {
    alternative.isMarked = !alternative.isMarked;
  };

  $scope.toPrevious = function() {
    if (this.currentIndex === undefined || this.currentIndex === null || this.currentIndex === 0) {
      this.currentIndex = this.questions.length - 1;
    } else {
      this.currentIndex--;
    }

    this.question = this.questions[this.currentIndex];
  };

  $scope.toNext = function() {
    if (this.currentIndex === undefined || this.currentIndex === null || this.currentIndex === (this.questions.length - 1)) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }

    this.question = this.questions[this.currentIndex];
  };

  $scope.markForReview = function() {
    this.question.markedForReview = !this.question.markedForReview;
  };

  $scope.finalize = function() {
    this.questions.forEach(function(question, index) {
      var wasAnswered = false;

      question.alternatives.forEach(function(alternative) {
        if (alternative.isMarked) {
          wasAnswered = true;
        }
      });

      question.isAnswered = wasAnswered;
    });
  };
});