"use strict";

var app = angular.module("qbApp");

app.factory("Group", function ($http, BASE_URL) {
    return {
        findAll: function () {
            return $http.get("/groups");
        },
        findById: function (_id) {
            return $http.get("/groups/" + _id);
        }
    };
});