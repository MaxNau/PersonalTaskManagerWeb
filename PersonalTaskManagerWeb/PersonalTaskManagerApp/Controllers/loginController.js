angular
    .module('PersonalTaskManager')
    .controller('loginController', function ($scope, $location, authService) {
 
    $scope.loginData = {
        userName: "",
        password: ""
    };
 
    $scope.message = "";
 
    $scope.login = function () {
        authService.postLogin($scope.User).then(function (response) {
            authService.storeToken(response.data.access_token);
            $location.path('/tasks');
        },
         function (err) {
             $scope.message = err.error_description;
         });
    };
 
});