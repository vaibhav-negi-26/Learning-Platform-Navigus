var app = angular.module("myApp", []);

// login controller
app.controller("myLogin", function ($scope, $http, $log, $window) {

    // teacher login
    $scope.name_tea
    $scope.email_tea
    $scope.password_tea
    $scope.c_password_tea
    $scope.college_tea
    $scope.contact_tea
    $scope.login_tea = function () {
        console.log('hi');
        if ($scope.name_tea === undefined ||$scope.email_tea === undefined ||$scope.password_tea === undefined ||$scope.c_password_tea === undefined || $scope.contact_tea === undefined) {
            return alert("Any Field is empty")
            // return console.log("Student email_tea or password_tea is empty.")
        }
        if ($scope.password_tea !== $scope.c_password_tea) {
            return alert("Password and Confirm Password Didn't Match.")
        }
        // console.log($scope.email_tea + " : " + $scope.password_tea)
        const req = {
            method: 'POST',
            url: '/teacher/create',
            data:  {
                name : $scope.name_tea,
                email : $scope.email_tea,
                contact : $scope.contact_tea,
                password : $scope.password_tea,
                college : $scope.college_tea
            }
        }
        const successCallback = (response) => {
            const tea_name = response.data.teacher.name
            const token = response.data.token
            localStorage.clear()
            localStorage.setItem("token", token)
            localStorage.setItem("tea_name", tea_name)
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
    $scope.name_stu
    $scope.email_stu
    $scope.password_stu
    $scope.c_password_stu
    $scope.college_stu
    $scope.contact_stu


    $scope.login_stu = function () {
        if ($scope.name_stu === undefined ||$scope.email_stu === undefined ||$scope.password_stu === undefined ||$scope.c_password_stu === undefined || $scope.contact_stu === undefined) {
            return alert("Any Field is empty")
            // return console.log("Student email_tea or password_tea is empty.")
        }
        if ($scope.password_stu !== $scope.c_password_stu) {
            return alert("Password and Confirm Password Didn't Match.")
        }

        // console.log($scope.email_stu + " : " + $scope.password_stu)
        const req = {
            method: 'POST',
            url: '/student/create',
            data: {
                name : $scope.name_stu,
                email : $scope.email_stu,
                contact : $scope.contact_stu,
                password : $scope.password_stu,
                college : $scope.college_stu
            }
        }
        const successCallback = (response) => {
            // console.log(response.data);
            const stu_name = response.data.student.name
            const token = response.data.token
            localStorage.clear()
            localStorage.setItem("token", token)
            localStorage.setItem("stu_name", stu_name)
            $window.location.href = '/student_dash.html'
            // console.log(response.status)
            // $log.info(response)
        }
        const errorCallback = (response) => {
            alert("Something went wrong")
            console.log("Something went wrong")
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
            $window.location.href = '/teacher_dash.html'
            // console.log(response.status)
            $log.info(response)
        }
        const error_tea = (response) => {
            console.log('Please Login')
            // $log.info(response)
        }

        // student check
        const success_stu = (response) => {
            $window.location.href = '/student_dash.html'
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