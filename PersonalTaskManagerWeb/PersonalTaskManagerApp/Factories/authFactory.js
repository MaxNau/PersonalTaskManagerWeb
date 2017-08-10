angular
    .module('PersonalTaskManager')
    .service('authService', ['$http', function ($http) {
        
        var serviceBase = 'http://localhost:55797/';
        var Token;
        var authenticated = false;
        var isInRole;

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
                url: serviceBase + "api/account/login",
                data: User
            });

            return request;
        };

        this.logout = function () {
            var request = $http({
                method: "post",
                url: serviceBase + "api/account/logout"
            });

            return request;
        };

        this.isAuthenticated = function () {
            var request = $http({
                method: "get",
                url: serviceBase + "api/account/IsAuthorized"
            });

            return request;
        };

        this.getAuth = function () {
            this.isAuthenticated().then(function (response) {
                authenticated = response.data;
            });
            return authenticated;
        };
    }]);