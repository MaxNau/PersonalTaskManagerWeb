angular
    .module('PersonalTaskManager')
    .controller('tasksController', function ($scope, $location, tasksService) {

        $scope.savedSuccessfully = false;
        $scope.message = "";
        $scope.filteredTodos = [];
        $scope.currentPage = 1;
        $scope.numPerPage = 3;
        $scope.maxSize = 4;
        $scope.totalItems;

        var tasks = [];

        $scope.addNewTask = function () {
            $location.path('addnewtask');
        };

        $scope.cancel = function () {
            $location.path('tasks');
        };

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

        $scope.editTask = function () {
            var task = tasksService.getTaskData();

            var Task = {
                Id: task.id,
                Title: $scope.task.title,
                Content: $scope.task.content,
                Tags: [],
                LastModified: new Date()
            };

            tasksService.putTask(Task.Id, Task);
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
                tasks = response.data;
                $scope.totalItems = tasks.length;
                paginate();
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

        var paginate = function() {
            $scope.$watch('currentPage + numPerPage', function () {
                var begin = ($scope.currentPage - 1) * $scope.numPerPage
                    , end = begin + $scope.numPerPage;

                $scope.filteredTasks = tasks.slice(begin, end);
            });
        };
    });
