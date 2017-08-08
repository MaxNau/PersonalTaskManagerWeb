
angular
    .module('PersonalTaskManager')
    .service('authService', ['$http', function ($http) {
        
        var serviceBase = 'http://localhost:55797/';

        this.postForm = function (registration) {
            var request = $http({
                method: "post",
                url: serviceBase + "api/account/register",
                data: registration
            });

            return request;
        };

        this.login = function (User) {

            var data = "grant_type=password&username=" + User.Name + "&password=" + User.Password;

            var deferred = $q.defer();

            $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

              //  localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

              //  _authentication.isAuth = true;
              //  _authentication.userName = loginData.userName;

                deferred.resolve(response);

            }).error(function (err, status) {
             //   _logOut();
                deferred.reject(err);
            });

            return deferred.promise;

        };


    }]);