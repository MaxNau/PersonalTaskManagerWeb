angular
    .module('PersonalTaskManager')
    .controller('tasksController', function ($scope, $location, tasksService) {

        $scope.savedSuccessfully = false;
        $scope.message = "";

        $scope.addNewTask = function () {
            $location.path('addnewtask');
        };

        $scope.cancel = function () {
            $location.path('tasks');
        }

        $scope.addTask = function () {
            var Task = {
                Id: 0,
                Title: $scope.title,
                Content: $scope.content,
                Tags: [],
                LastModified: new Date()
            };

            tasksService.postTask(Task);
        };

        $scope.removeTask = function (id, index) {
            tasksService.deleteTask(id);
            $scope.tasks.splice(index, 1);
        };

        $scope.getTask = function (id) {
            tasksService.getTask(id)
                .then(function (response) {
                    $location.path('edittask');
                    tasksService.storeTaskData(response.data);
                });
        };

        var getTasks = function () {
            tasksService.getTasks().then(function (response) {
                $scope.tasks = response.data;
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

        if ($location.path() === '/tasks') {
            getTasks();
        }
        else if ($location.path() === '/edittask'){
            $scope.task = tasksService.getTaskData();
        }
    });
