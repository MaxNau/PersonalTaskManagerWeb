angular.module('PersonalTaskManager', ['ngRoute', 'ui.bootstrap'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when("/", {
            templateUrl: "personaltaskmanagerapp/views/home.html",
            controller: 'loginController'
        })
            .when("/register", {
                templateUrl: "personaltaskmanagerapp/views/register.html",
                controller: 'RegistrationController'
            })
            .when("/login", {
                templateUrl: "personaltaskmanagerapp/views/login.html",
                controller: 'loginController'
            })
            .when("/tasks", {
                templateUrl: "personaltaskmanagerapp/views/tasks.html",
                controller: 'tasksController'
            })
            .when("/addnewtask", {
                templateUrl: "personaltaskmanagerapp/views/addtask.html",
                controller: 'tasksController'
            })
            .when("/edittask", {
                templateUrl: "personaltaskmanagerapp/views/edittask.html",
                controller: 'tasksController'
            })
            .otherwise({
                redirectTo: '/',
                controller: 'loginController'
            });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
});

angular.module('PersonalTaskManager')
    .run(function ($rootScope, authService) {
        $rootScope.appName = 'PTM App';
        $rootScope.authenticated = authService.getAuth();
    });


