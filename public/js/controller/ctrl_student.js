// 1st main
app.controller('Ctrl', function ($scope, $http, $log, $window) {
    console.log("This is developers panel not for noraml users. (Student)");
    const token = localStorage.getItem("token");
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
});

app.controller('profileCtrl', function ($scope) {
    $scope.name = 'Vaibhav'
})