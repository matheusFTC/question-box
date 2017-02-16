"use strict";

var app = angular.module("qbApp");

app.factory("Group", function ($http) {
    return {
        findAll: function () {
            return $http.get("/groups");
        },
        findById: function (_id) {
            return $http.get("/groups/" + _id);
        }
    };
});