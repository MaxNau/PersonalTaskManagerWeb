angular
    .module('PersonalTaskManager')
    .controller('loginController', function ($scope, $location, authService) {
 
    $scope.loginData = {
        userName: "",
        password: ""
    };
 
    $scope.message = "";
 
    $scope.login = function () {
        authService.login($scope.User).then(function (response) {
            $location.path('/tasks');
        },
         function (err) {
             $scope.message = err.error_description;
         });
    };
 
}]);