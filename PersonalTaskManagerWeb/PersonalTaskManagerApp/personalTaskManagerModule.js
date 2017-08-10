angular.module('PersonalTaskManager', ['ngRoute', 'ui.bootstrap'])
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
                controller: 'loginController'
            });

            $routeProvider.when("/tasks", {
                templateUrl: "personaltaskmanagerapp/views/tasks.html",
                controller: 'tasksController'
            });

            $routeProvider.when("/addnewtask", {
                templateUrl: "personaltaskmanagerapp/views/addtask.html",
                controller: 'tasksController'
            });

            $routeProvider.when("/edittask", {
                templateUrl: "personaltaskmanagerapp/views/edittask.html",
                controller: 'tasksController'
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


