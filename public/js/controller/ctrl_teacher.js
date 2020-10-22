// 1st main

app.controller('Ctrl', function ($scope) {
    console.log("This is developers panel not for noraml users. (Teacher)");

    // logout
    $scope.signout_tea = () => {
        const successCallback = (response) => {
            console.log(response.data)
            localStorage.removeItem("token");
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
            url: '/users/logout',
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