/**
 * Created by arun on 10/31/15.
 */
module.exports  = function($routeProvider){

    $routeProvider

        // route for the home page
        .when('/timeLine', {
            templateUrl : 'template/timeline',
            controller  : 'timeLineController'
        })

        // route for the about page
        .when('/tasks', {
            templateUrl : 'template/tasks',
            controller  : 'taskController'
        });





};