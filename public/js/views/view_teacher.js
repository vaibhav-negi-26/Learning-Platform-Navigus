var app = angular.module('App', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl: "template/temp_teacher/home.html",
        controller: "Ctrl"
    })
    .when("/profile", {
        templateUrl: "template/temp_teacher/profile.html",
        controller: "profileCtrl"
    })
    .when("/course", {
        templateUrl: "template/temp_teacher/course.html",
        controller: "mycourseCtrl"
    })
    .when("/addcourse", {
        templateUrl: "template/temp_teacher/add_course.html",
        controller: "addcourseCtrl"
    })
    .when("/quiz", {
        templateUrl: "template/temp_teacher/quiz.html",
        controller: "myquizCtrl"
    })
    .otherwise({
        redirectTo: "/home"
    })
})
