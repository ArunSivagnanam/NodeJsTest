/**
 * Created by arun on 10/31/15.
 */

module.exports = {
    timeLineController: function($scope){

    },
    taskController: function($scope,taskService){

        var promise = taskService.getUsers();

        promise.then(function(data){

            $scope.tasks = data;
            console.log($scope.tasks);
        });


        $scope.getTasks = function(){
            var promise = taskService.getUsers();

            promise.then(function(data){

                $scope.clicked = data;
                console.log($scope.clicked);
            });
        }
    }
};