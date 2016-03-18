(function()
{
	angular
		.module("FormBuilderApp")
		.factory("FormService", FieldService);

    function FieldService ($http, $q) {
        var model = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };
        return model;

        var baseUrl = "/api/assignment/form/{0}/field/{1}";

        function createFieldForForm(formId, field) {
            var deferred = $q.defer();
            $http.post(baseUrl.format(formId, ""), field)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

       function getFieldsForForm(formId) {
            var deferred = $q.defer();
            $http.get(baseUrl.format(formId, ""))
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
       }

       function getFieldForForm(formId, fieldId) {
            var deferred = $q.defer();
            $http.get(baseUrl.format(formId, fieldId))
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
       }

       function deleteFieldFromForm(formId, fieldId) {
            var deferred = $q.defer();
            $http.delete(baseUrl.format(formId, fieldId))
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
       }

       function updateField(formId, fieldId, newField) {
            var deferred = $q.defer();
            $http.put(baseUrl.format(formId, fieldId), newField)
                .success(function(response){
                    deferred.resolve(response);
                });

           return deferred.promise;
    }

})();
