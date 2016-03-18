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
        
        function createFormForUser(userId, form, callback) {
            var lform = form;
            lform.userId = userId;
            lform.title = form.title;
            lform._id = (new Date).getTime();
            model.forms.push(lform);
            callback(lform);
        }
       
       function findAllFormsForUser(userId, callback) {
           var result = model.forms.filter(function(value) {
                return value.userId == userId;    
           });
           callback(result);
       }
       
       function deleteFormById(formId, callback) {
            for(var f in model.forms) {
                if(model.forms[f]._id == formId) {
                    model.forms.splice(f, 1);
                    break;
                }
            }
            callback(model.forms);    
       }
       
       function updateFormById(formId, newForm, callback) {
           var form = null;
           for(var f in model.forms) {
                if(model.forms[f]._id == formId) {
                    cuser = model.forms[f];
                    model.forms[f] = {
                        "_id" : formId,
                        "title" : newForm.title ? newForm.title : form.title,
                        "userId" : newForm.userId ? newForm.userId : form.userId,
                    }
                    form = model.forms[f];
                    break;
                }
            }
            callback(form);   
        }
    }
    
})();