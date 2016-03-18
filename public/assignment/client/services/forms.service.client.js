(function()
{
	angular
		.module("FormBuilderApp")
		.factory("FormService", FormService);
		
    function FormService () {
        var model = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
            
        };
        return model;
        
        var userUrl = "/api/assignment/user/{0}/form";
        var formUrl = "/api/assignment/form/{0}";
        
        function createFormForUser(userId, form) {
            var deferred = $q.defer();
            $http.post(userUrl.format(userId), form)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
       
       function findAllFormsForUser(userId, callback) {
            var deferred = $q.defer();
            $http.get(userUrl.format(userId), form)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
       }
       
       function deleteFormById(formId, callback) {
            var deferred = $q.defer();
            $http.delete(formUrl.format(userId), form)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
       }
       
       function updateFormById(formId, newForm, callback) {
            var deferred = $q.defer();
            $http.put(formUrl.format(formId), newForm)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
    }
    
})();