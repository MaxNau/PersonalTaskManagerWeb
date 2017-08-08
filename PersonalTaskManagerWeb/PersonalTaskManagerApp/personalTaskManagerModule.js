﻿angular.module('PersonalTaskManager', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
            $routeProvider.when("/", {
                templateUrl: "personaltaskmanagerapp/views/home.html"
            });

            $routeProvider.when("/register", {
                templateUrl: "personaltaskmanagerapp/views/register.html",
                controller: 'RegistrationController'
            });

            $routeProvider.when("/login", {
                templateUrl: "personaltaskmanagerapp/views/login.html",
                controller: 'RegistrationController'
            });

            $routeProvider.when("/tasks", {
                templateUrl: "personaltaskmanagerapp/views/tasks.html",
                controller: 'RegistrationController'
            });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
});

angular.module('PersonalTaskManager')
    .run(function ($rootScope) {
        $rootScope.appName = 'PTM App';
    });


