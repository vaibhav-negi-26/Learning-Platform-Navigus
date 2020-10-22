var app = angular.module('App', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl: "template/temp_student/home.html",
        controller: "Ctrl"
    })
    .when("/profile", {
        templateUrl: "template/temp_student/profile.html",
        controller: "profileCtrl"
    })
    .when("/quiz", {
        templateUrl: "template/temp_student/quiz.html",
        controller: "profileCtrl"
    })
    .when("/results", {
        templateUrl: "template/temp_student/result.html",
        controller: "profileCtrl"
    })
    .otherwise({
        redirectTo: "/home"
    })
})
