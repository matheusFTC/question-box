"use strict";

var app = angular.module("qbApp", ["ngRoute"]);

app.run(function($rootScope) {
  $rootScope.message = {
    text: null,
    isSuccess: false,
    isError: false,
    success: function(text) {
      this.text = text;
      this.isSuccess = true;
    },
    error: function(text) {
      this.text = text;
      this.isError = true;
    },
    internalServerError: function(text) {
      if (text) {
        this.text = text;
      } else {
        this.text = "This action could not be taken.";
      }
      this.isError = true;
    },
    unauthorized: function(text) {
      if (text) {
        this.text = text;
      } else {
        this.text = "You are not authorized to perform this action.";
      }
      this.isError = true;
    },
    close: function() {
      this.text = null;
      this.isSuccess = false;
      this.isError = false;
    }
  };
});