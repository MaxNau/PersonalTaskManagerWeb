angular
    .module('PersonalTaskManager')
    .service('tasksService', ['$http', 'authService', function ($http, authService) {

        var serviceBase = 'http://localhost:55797/';
        var title; 
        var TaskData;

        this.storeTaskData = function (task) {
            TaskData = task;
        };

        this.getTaskData = function () {
            return TaskData;
        };

        this.getTasks = function () {
            var a = authService.getToken();
            var request = $http({
                method: "get",
                headers: {
                    "Authorization": 'Bearer ' + authService.getToken()
                },
                url: serviceBase + "api/tasks"
            });

            return request;
        };

        this.getTask = function (id) {
            var request = $http({
                method: "get",
                url: serviceBase + "api/tasks/" + id
            });

            return request;
        };

        this.postTask = function (Task) {
            var request = $http({
                method: "post",
                url: serviceBase + "api/tasks",
                data: Task
            });

            return request;
        };

        this.deleteTask = function (id) {
            var request = $http({
                method: "delete",
                url: serviceBase + "api/tasks/" + id,
                data: id
            });
            title = request.data.title;
            return request;
        };

        this.putTask = function (id, Task) {
            var request = $http({
                method: "put",
                url: serviceBase + "api/tasks/" + id,
                data: Task 
            });
        };

    }]);