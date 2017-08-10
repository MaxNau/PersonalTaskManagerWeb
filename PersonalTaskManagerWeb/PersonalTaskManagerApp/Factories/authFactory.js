angular
    .module('PersonalTaskManager')
    .service('authService', ['$http', function ($http) {
        
        var serviceBase = 'http://localhost:55797/';
        var Token;

        this.storeToken = function (token) {
            Token = token;
        };

        this.getToken = function () {
            return Token;
        };

        this.postForm = function (User) {
            var request = $http({
                method: "post",
                url: serviceBase + "api/account/register",
                data: User
            });

            return request;
        };

        this.postLogin = function (User) {

            var data = "grant_type=password&username=" + User.Name + "&password=" + User.Password;
            var request = $http({
                method: "post",
                //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                url: serviceBase + "token",
                data: data
            });

            return request;
        };

    }]);