// 1st main
app.controller('Ctrl', function ($scope, $http, $log, $window) {
    console.log("This is developers panel not for noraml users. (Student)");
    const token = localStorage.getItem("token");
    const stu_name = localStorage.getItem("stu_name");
    $scope.name = stu_name
    var preloader = $(".preloader")
    setTimeout(function () {
        preloader.fadeOut("slow")
    }, 500)

    // logout Student
    $scope.signout_stu = () => {
        const successCallback = (response) => {
            console.log(response.data)
            localStorage.clear()
            $window.location.href = '/'
            // $log.info(response)
        }
        const errorCallback = (response) => {
            console.log(response)
            // console.log(response.status)
            // $log.info(response)
        }
        $http({
            method: 'POST',
            url: '/student/logout',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then(successCallback, errorCallback)
    }
})
app.controller('profileCtrl', function ($scope,$http, $window) {

    // declaration
    $scope.profile_name
    $scope.profile_email
    $scope.profile_password = ''
    $scope.profile_c_password = ''
    $scope.profile_college
    $scope.profile_contact

    const token = localStorage.getItem("token");

    // fetching user details
    const success = (response) => {
        $scope.profile_name = response.data.name
        $scope.profile_email = response.data.email
        $scope.profile_college = response.data.college
        $scope.profile_contact = parseInt(response.data.contact)
        // console.log(response.data)
        // $log.info(response)
    }
    const error = (response) => {
        console.log(response)
        if (response.status === 401) {
            $window.location.href = '/'
        }
        // $log.info(response)
    }
    $http({
        method: 'GET',
        url: '/student/me',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    }).then(success, error)

    // update profile
    $scope.update_profile = () => {
        // console.log($scope.profile_password + " : " + $scope.profile_c_password)
        if ($scope.profile_password !== $scope.profile_c_password) {
            alert("Password and Confirm Password Didn't Match.")
            return
        }

        let obj = {
            name: $scope.profile_name,
            email: $scope.profile_email,
            contact: $scope.profile_contact,
            college: $scope.profile_college
        }

        if ($scope.profile_password === $scope.profile_c_password &&
            $scope.profile_password !== '' && $scope.profile_c_password !== '') {
            obj = {
                ...obj,
                password: $scope.profile_password
            }
        }

        const success = (response) => {
            $scope.profile_name = response.data.name
            $scope.profile_email = response.data.email
            $scope.profile_college = response.data.college
            $scope.profile_contact = parseInt(response.data.contact)
            $window.location.reload()
            // console.log(response.data)
            // $log.info(response)
        }
        const error = (response) => {
            console.log(response)
            if (response.status === 401) {
                $window.location.href = '/'
            }
            // $log.info(response)
        }
        $http({
            method: 'PATCH',
            url: '/student/me',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            data: obj
        }).then(success, error)

    }
})