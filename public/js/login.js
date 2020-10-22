var app = angular.module("myApp", []);

// login controller
app.controller("myLogin", function ($scope, $http, $log, $window) {

    // teacher login
    $scope.email_tea
    $scope.password_tea
    $scope.login_tea = function () {
        if ($scope.email_tea === undefined || $scope.password_tea === undefined) {
            return console.log("Teacher email_tea or password_tea is empty.")
        }
        // console.log($scope.email_tea + " : " + $scope.password_tea)
        const req = {
            method: 'POST',
            url: '/teacher/login',
            data: {
                email: $scope.email_tea,
                password: $scope.password_tea
            }
        }
        const successCallback = (response) => {
            const tea_name = response.data.name
            const token = response.data.token
            localStorage.clear()
            localStorage.setItem("token", token)
            $window.location.href = '/teacher_dash.html';
            // console.log(response.status)
            // $log.info(response)
        }
        const errorCallback = (response) => {
            alert("Wrong Email or Password")
            console.log("Wrong Email or Password")
            // console.log(response.status)
            // $log.info(response)
        }
        $http(req).then(successCallback, errorCallback)
    }

    // student login
    $scope.email_stu
    $scope.password_stu
    $scope.login_stu = function () {
        if ($scope.email_stu === undefined || $scope.password_stu === undefined) {
            return console.log("Student email_tea or password_tea is empty.")
        }
        // console.log($scope.email_stu + " : " + $scope.password_stu)
        const req = {
            method: 'POST',
            url: '/student/login',
            data: {
                email: $scope.email_stu,
                password: $scope.password_stu
            }
        }
        const successCallback = (response) => {
            const stu_name = response.data.name
            const token = response.data.token
            localStorage.clear()
            localStorage.setItem("token", token)
            localStorage.setItem("stu_name", stu_name)
            $window.location.href = '/student_dash.html'
            // console.log(response.status)
            // $log.info(response)
        }
        const errorCallback = (response) => {
            alert("Wrong Email or Password")
            console.log("Wrong Email or Password")
            // console.log(response.status)
            // $log.info(response)
        }
        $http(req).then(successCallback, errorCallback)
    }

    // getting token form localstorage
    const token = localStorage.getItem("token");
    if (token !== null) {
        // checking authentication whether already logged in or not?
        // teacher check
        const success_tea = (response) => {
            // $window.location.href = '/home.html'
            // console.log(response.status)
            $log.info(response)
        }
        const error_tea = (response) => {
            console.log('Please Login')
            // $log.info(response)
        }

        // student check
        const success_stu = (response) => {
            // $window.location.href = '/home.html'
            // console.log(response.status)
            $log.info(response)
        }
        const error_stu = (response) => {
            $http({
                method: 'GET',
                url: '/teacher/me',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            }).then(success_tea, error_tea)
            // $log.info(response)
        }
        $http({
            method: 'GET',
            url: '/student/me',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then(success_stu, error_stu)
    }

});