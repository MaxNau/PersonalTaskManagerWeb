angular
    .module('PersonalTaskManager')
    .controller('loginController', function ($scope, $rootScope, $location, authService) {
 
    $scope.loginData = {
        userName: "",
        password: ""
    };
 
    $scope.message = "";

    $scope.$watch('authenticated', function (newValue, oldValue) {
        $rootScope.authenticated = newValue;
    });
 
    $scope.login = function () {
        authService.postLogin($scope.User).then(function (response) {
            authService.storeToken(response.data.access_token);
            if (response.status === 200)
                $rootScope.authenticated = true;
            $location.path('/tasks');
        },
         function (err) {
             $scope.message = err.error_description;
         });
    };

    $scope.logout = function () {
        authService.logout().then(function () {
            $rootScope.authenticated = false;
            $location.path('/');
        });
    };

});