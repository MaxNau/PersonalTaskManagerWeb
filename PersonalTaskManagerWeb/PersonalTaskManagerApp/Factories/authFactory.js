
angular
    .module('PersonalTaskManager')
    .service('authService', ['$http', function ($http) {
        
        var serviceBase = 'http://localhost:55797/';

        this.postForm = function (User) {
            var request = $http({
                method: "post",
                url: serviceBase + "api/account/register",
                data: User
            });

            return request;
        };

    }]);