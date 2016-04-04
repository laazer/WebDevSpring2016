(function()
{
	angular
		.module("FormBuilderApp")
		.factory("FieldService", FieldService);

    function FieldService ($http, $q) {
        var baseUrl = "/api/assignment/form/{0}/field/{1}";
				var model = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };
        return model;

        function createFieldForForm(formId, field) {
            return $http.post(baseUrl.format(formId, ""), field);
				}

       function getFieldsForForm(formId) {
            return $http.get(baseUrl.format(formId, ""));
       }

       function getFieldForForm(formId, fieldId) {
            return $http.get(baseUrl.format(formId, fieldId));
       }

       function deleteFieldFromForm(formId, fieldId) {
            return $http.delete(baseUrl.format(formId, fieldId));
       }

       function updateField(formId, fieldId, newField) {
            return $http.put(baseUrl.format(formId, fieldId), newField);
      }
		}

})();
