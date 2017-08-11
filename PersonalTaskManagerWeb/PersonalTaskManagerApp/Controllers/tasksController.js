angular
    .module('PersonalTaskManager')
    .controller('tasksController', function ($scope, $rootScope, $location, tasksService, authService) {

        $scope.savedSuccessfully = false;
        $scope.message = "";
        $scope.filteredTodos = [];
        $scope.currentPage = 1;
        $scope.numPerPage = 3;
        $scope.maxSize = 4;
        $scope.totalItems;

       // $rootScope.authenticated = authService.getAuth();

        $scope.$watch('authenticated', function (newValue, oldValue) {
            $rootScope.authenticated = newValue;
        });

        var Tags = [Tag = {
            Id: 0,
            Name: "Tag1",
            Slug: ""
        },
        Tag = {
            Id: 0,
            Name: "Tag2",
            Slug: ""
        }
        ];

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
                Tags: Tags,
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

        var paginate = function () {
            $scope.$watch('currentPage + numPerPage', function () {
                var begin = ($scope.currentPage - 1) * $scope.numPerPage
                    , end = begin + $scope.numPerPage;

                $scope.filteredTasks = tasks.slice(begin, end);
            });
        };

        $scope.tags = Tags;

   /*     $scope.addTag = function ($event) {
            $event.cancelBubble = true;
            $event.returnValue = false;
            var myElements = angular.element(document.querySelector('#tags'));
            myElements.append('<span class="tag label label-info" style="display:inline">Tag<span><a><i class="remove glyphicon glyphicon-remove-sign glyphicon-white"></i></a></span></span>');
        };*/

        $scope.addNewTag = function (tagName) {
            Tag = {
                Id: 0,
                Name: tagName
            };

            $scope.tags.push(Tag);
        };

        $scope.removeTag = function (index) {
            $scope.tags.splice(index, 1);
        };
    });
