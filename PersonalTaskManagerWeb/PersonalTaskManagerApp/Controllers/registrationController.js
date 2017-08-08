angular
    .module('PersonalTaskManager')
    .controller('RegistrationController', function ($scope, $location, authService) {

            $scope.savedSuccessfully = false;
            $scope.message = "";

            $scope.User = {
                Name: "",
                Password: "",
                ConfirmPassword: ""
            };

            $scope.register = function () {
                authService.postForm($scope.User).then(function (response) {
                    $scope.savedSuccessfully = true;
                    $location.path('/');
                },
                    function (response) {
                        var errors = [];
                        for (var key in response.data.modelState) {
                            for (var i = 0; i < response.data.modelState[key].length; i++) {
                                errors.push(response.data.modelState[key][i]);
                            }
                        }
                        $scope.message = errors.join(' ');
                    });
    };
});
