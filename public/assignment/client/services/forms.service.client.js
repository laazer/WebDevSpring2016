(function()
{
	angular
		.module("FormBuilderApp")
		.factory("FormService", FormService);

    function FormService ($http, $q) {
				var userUrl = "/api/assignment/user/{0}/form";
				var formUrl = "/api/assignment/form/{0}";
				var model = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return model;

        function createFormForUser(userId, form) {
            return $http.post(userUrl.format(userId), form);
        }

       function findAllFormsForUser(userId) {
            return $http.get(userUrl.format(userId));
       }

       function deleteFormById(formId) {
            return $http.delete(formUrl.format(formId));
       }

       function updateFormById(formId, newForm) {
            return $http.put(formUrl.format(formId), newForm);
  		}

		}
})();
