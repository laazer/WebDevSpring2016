var model = require('./form.mock.json');
var uuid = require('node-uuid');

module.exports = function() {

    var api = {
        createFormForUser: createFormForUser,
        findFormById: findFormById,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        deleteFieldById: deleteFieldById,
        createFieldForForm: createFieldForForm,
        updateFieldById: updateFieldById
    };
    return api;

    function createFormForUser(userId, lform) {
        lform.userId = userId;
        lform.title = form.title;
        lform._id = uuid.v1();
        model.forms.push(lform);
        return lform;
    }

    function createFieldForForm(formId, field) {
        var form = findFormById(formId);
        var lfield = field;
        lfield._id = uuid.v1();
        form.fields.push(lfield);
        updateFormById(formId, form);
        return lfield;
    }

   function findFormById(formId) {
       for(var f in model.forms) {
           if(model.forms[f]._id == formId) {
               return model.forms[f];
           }
       }
       return null;
   }

   function findAllFormsForUser(userId) {
       var result = model.forms.filter(function(value) {
            return value.userId == userId;
       });
       return result;
   }

   function deleteFormById(formId) {
        for(var f in model.forms) {
            if(model.forms[f]._id == formId) {
                model.forms.splice(f, 1);
                return true;
            }
        }
        return false;
   }

   function deleteFieldById(formId, fieldId) {
       var form = findFormById(fieldId);
       for(f in form.fields) {
          if(form.fields[f]._id == fieldId) {
                form.fields.splice(f, 1);
          }
       }
       return updateFormById(formId, form);
   }

   function updateFormById(formId, newForm) {
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
                return form;
            }
        }
        return null;
    }

    function updateFieldById(formId, fieldId, field) {
        deleteFieldById(formId, fieldId);
        var form = findFormById(formId);
        form.fields.push(field);
        return updateFormById(formId, form);
    }


}
