/**
 * Created by arun on 10/31/15.
 */

module.exports = {
    taskService: function($http,$q){

        var defered = $q.defer();
        $http.get('taskApi/tasks/561e3b48b7a3e60512406746').then(function(data){
            defered.resolve(data);
        });

        this.getUsers = function(){
            return defered.promise;
        }
    },
    timeLineService:function($http,$q){


    }
};