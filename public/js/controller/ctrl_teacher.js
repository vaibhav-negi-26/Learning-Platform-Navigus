// 1st main
app.controller('Ctrl', function ($scope, $http, $log, $window) {
    console.log("This is developers panel not for noraml users. (Teacher)");
    const token = localStorage.getItem("token");
    const tea_name = localStorage.getItem("tea_name");
    $scope.name = tea_name
    var preloader = $(".preloader")
    setTimeout(function () {
        preloader.fadeOut("slow")
    }, 500)

    // logout
    $scope.signout_tea = () => {
        preloader.fadeIn("slow")
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
            url: '/teacher/logout',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then(successCallback, errorCallback)
    }

    // checking authentication
    const success = (response) => {
        $scope.name = response.data.name
        // console.log(response.status)
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
        url: '/teacher/me',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    }).then(success, error)
})
app.controller('profileCtrl', function ($scope, $http, $window) {

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
        url: '/teacher/me',
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
            url: '/teacher/me',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            data: obj
        }).then(success, error)

    }
})
app.controller('mycourseCtrl', function ($scope, $http, $window) {

    const token = localStorage.getItem("token");
    $scope.courses
    const success = (response) => {
        $scope.courses = response.data
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
        url: '/course/me',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    }).then(success, error)

    // deleting course
    $scope.del_course = (course_id) => {
        const success = (response) => {
            $scope.courses = response.data
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
            method: 'DELETE',
            url: '/course/'+course_id,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then(success, error)
    
    }

})
app.controller('addcourseCtrl', function ($scope, $http, $window) {
    
    // declaration
    const token = localStorage.getItem("token");
    $scope.course_title
    $scope.course_description
    $scope.course_credit

    // create function
    $scope.create_course = () => {

        let course_obj = {
            title: $scope.course_title,
            description: $scope.course_description,
            credit:  $scope.course_credit.toString()
        }

        const success = (response) => {
            $window.location.reload()
            // console.log(response.data)
            // $log.info(response)
        }
        const error = (response) => {
            console.log(response)
            if (response.status === 400) {
                alert("Something went wrong")
                $window.location.reload()
            }
            // $log.info(response)
        }
        $http({
            method: 'POST',
            url: '/course/create',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            data: course_obj
        }).then(success, error)
    }
})
app.controller('myquizCtrl', function ($scope, $http, $window) {

    const token = localStorage.getItem("token");
    $scope.quizs
    const success = (response) => {
        $scope.quizs = response.data
        // console.log(response.data)
        // $log.info(response)
    }
    const error = (response) => {
        console.log(response)
        if (response.status === 401) {
            $window.location.href = '/'
        }
        if (response.status === 500) {
            alert("Something went wrong")
            $window.location.reload()
        }
        // $log.info(response)
    }
    $http({
        method: 'GET',
        url: '/quiz/me',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    }).then(success, error)


    // add function
    $scope.add_quiz = () => {
        console.log('add quiz');
    }
    // update function
    // $scope.create_course = () => {
    // }
    // delete function
    // $scope.create_course = () => {
    // }
})