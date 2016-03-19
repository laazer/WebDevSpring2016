(function()
{
	angular
		.module("FormBuilderApp")
		.controller("FormController", formController);

    function formController ($rootScope, $scope, $location, FormService) {
	   	 var fc = this;
       var selectedForm = null;
       $scope.error =  null;
       $scope.message = null;
       $scope.addForm = addForm;
       $scope.updateForm = updateForm;
       $scope.deleteForm = deleteForm;
       $scope.selectForm = selectForm;

       if (!$rootScope.currentUser) {
            $location.url("/");
       }
       else $scope.userId = $rootScope.currentUser._id;

       FormService.findAllFormsForUser($scope.userId).then(function(forms) {
           $scope.forms = forms;
       });

       function addForm(form) {
            if(!form) {
               $scope.error = "Missing form title.";
               return;
           }
           if(fc.selectedForm) {
               $scope.error = "Form is curretnly being updated.";
               return;
           }
           var cform = angular.copy(form);
           FormService.createFormForUser($scope.userId, cform).then(function(form) {
               reloadForms();
           });
       }

       function updateForm(form) {
           if(!fc.selectedForm) {
               $scope.error = "No form seleced for editting.";
               return;
           }
           FormService.updateFormById(form._id, form).then(function(form) {
               reloadForms();
           });
           fc.selectedForm = null;
           $scope.form = null;
           $scope.message = "Form updated successfully."
       }

       function deleteForm(index) {
           if (fc.selectedForm) {
               $scope.error = "Form is currently being updated.";
               return;
           }
           var formId = $scope.forms[index]._id;
            FormService.deleteFormById(formId).then(function(form) {
               reloadForms();
           });
       }

       function selectForm(index) {
           $scope.form = $scope.forms[index];
           fc.selectedForm = $scope.form;
       }

       function reloadForms() {
            FormService.findAllFormsForUser($scope.userId).then(function(forms) {
                $scope.forms = forms;
            });
       }
    }
})();
