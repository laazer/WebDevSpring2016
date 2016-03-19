(function()
{
	angular
		.module("FormBuilderApp")
		.controller("FormFieldsController", formFieldsController);

    function formFieldsController ($rootScope, $scope, $location, $route, FieldService) {


        $scope.formId = $route.current.params['formId'];
        $scope.fields = null;
        $scope.addField = addField;
        $scope.deleteField = deleteField;
        $scope.updateField = updateField;
        $scope.isTextField = isTextField;
        $scope.isOptionField = isOptionField;

        if (!$rootScope.currentUser) {
             $location.url("/");
        }
        else $scope.userId = $rootScope.currentUser._id;
        reloadFields();

        var fieldMap = {
                        "TEXT": { "_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field" },
                        "TEXTAREA": { "_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field" },
                        "DATE": { "_id": null, "label": "New Date Field", "type": "DATE" },
                        "DROPDOWN": {
                            "_id": null, "label": "New Dropdown", "type": "DROPDOWN", "options": [
                                { "label": "Option 1", "value": "OPTION_1" },
                                { "label": "Option 2", "value": "OPTION_2" },
                                { "label": "Option 3", "value": "OPTION_3" }
                            ]
                        },
                        "CHECKBOXES": {
                            "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                                { "label": "Option A", "value": "OPTION_A" },
                                { "label": "Option B", "value": "OPTION_B" },
                                { "label": "Option C", "value": "OPTION_C" }
                            ]
                        },
                        "RADIOS": {
                            "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                                { "label": "Option X", "value": "OPTION_X" },
                                { "label": "Option Y", "value": "OPTION_Y" },
                                { "label": "Option Z", "value": "OPTION_Z" }
                            ]
                        }
                    };
          var optionMap = {};

          function addField(newFieldType) {
            var field = fieldMap[newFieldType];
            FieldService.createFieldForForm($scope.formId, field).then(function(field) {
                  reloadFields();
            });
          }

          function deleteField(fieldId) {
            FieldService.deleteFieldFromForm($scope.formId, field).then(function(result) {
                  reloadFields();
            });
          }

          function getOptionsForField(fieldId) {
              var optionString = optionMap[fieldId];
              var options = optionString.split('\n');
              var result = [];
              for(o in options) {
                  var option = options[o];
                  if (option) {
                      var pair = option.split(":");
                      result.push({ "label": pair[0], "value": pair[1] });
                  }
              }
              return result;
          };

          function updateField(field) {
              if(field.options) {
                  field.options = getOptionsForField(field._id);
              }
              FieldService.updateField($scope.formId, field._id, field).then(function(fields) {
                  reloadFields();
              })
          }

          function reloadFields() {
               FieldService.getFieldsForForm($scope.formId).then(function(fields) {
                   $scope.fields = fields;
               });
          }

          function updateOptions() {
              for(f in $scope.fields) {
                  var field = $scope.fields[f];
                  if(field.options) {
                      var base = [];
                      for(o in field.options) {
                          base.push(field.options[o]);
                      }
                      optionMap[field._id] = base
                  }
              }
          }

          function isTextField(ntype) {
              return ntype === 'TEXT' || ntype === 'TEXTAREA'
          }

          function isOptionField(nfield) {
              return nfield.type === 'DROPDOWN' ||
              nfield.type === 'RADIOS' || nfield.type === 'CHECKBOXES'
          }

    }
})();
