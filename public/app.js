"use strict";

var app = angular.module("qbApp", ["ngRoute", "ngCookies"]);

app.config(function($routeProvider) {

  $routeProvider.otherwise({
    redirectTo: "/"
  });
});

app.run(function($rootScope) {

  $rootScope.message = {
    text: null,
    isSuccess: false,
    isError: false,
    success: function(text) {
      this.clear();

      this.text = text;
      this.isSuccess = true;
    },
    error: function(text) {
      this.clear();

      this.text = text;
      this.isError = true;
    },
    internalServerError: function(text) {
      this.clear();

      if (text) {
        this.text = text;
      } else {
        this.text = "This action could not be taken.";
      }

      this.isError = true;
    },
    unauthorized: function(text) {
      this.clear();

      if (text) {
        this.text = text;
      } else {
        this.text = "You are not authorized to perform this action.";
      }

      this.isError = true;
    },
    close: function() {
      this.clear();
    },
    clear: function() {
      this.text = null;
      this.isSuccess = false;
      this.isError = false;
    }
  };
});