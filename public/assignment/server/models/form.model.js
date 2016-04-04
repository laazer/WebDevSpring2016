var q = require("q");

module.exports = function(uuid, mongoose, db) {
    var model = require("./form.mock.json");
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel;
    if (mongoose.models.Form) {
      FormModel = mongoose.model('Form');
    } else {
      FormModel = mongoose.model('Form', FormSchema);
    }
    // var FieldSchema = require("./field.schema.server.js")(mongoose);
    // var FieldModel = mongoose.model('Field', FieldSchema);

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

    function createFormForUser(userId, form) {
        form.userId = userId;
        var deferred = q.defer();
        FormModel.create(form, function(err, form){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;

    }

    function createFieldForForm(formId, field) {
        return FormModel.findById(formId)
            .then(
                function (form) {
                    form.fields.push(field);
                    return form.save();
                }
            )
    }

   function findFormById(formId) {
       var deferred = q.defer();
       FormModel.findOne({_id: formId}, function(err, form) {
           if(err) {
               deferred.reject(err);
           } else {
               deferred.resolve(form);
           }
       });
       return deferred.promise;
   }

   function findAllFormsForUser(userId) {
       var deferred = q.defer();
       FormModel.find({userId : userId}, function(err, forms) {
          if(err) {
              deferred.reject(err);
          } else {
              deferred.resolve(forms);
          }
       });
       return deferred.promise;
   }

   function deleteFormById(formId) {
       var deferred = q.defer();
       FormModel.remove({_id : formId}, function(err, form) {
           if(err) {
               deferred.reject(err);
           } else {
               deferred.resolve(form);
           }
       });
       return deferred.promise;
   }

   function deleteFieldById(formId, fieldId) {
       return FormModel.findById(formId).then(
           function(form) {
               form.fields.id(fieldId).remove();
               return form.save();
           }
       )
   }

   function updateFormById(formId, newForm) {
       var deferred = q.defer();
       FormModel.update({_id : formId}, {$set: newForm}, function (err, form) {
           if(err) {
               deferred.reject(err);
           } else{
               deferred.resolve(form);
           }
       });
       return deferred.promise;
    }

    function updateFieldById(formId, fieldId, newField) {
        return FormModel.findById(formId).then(
            function(form) {
                var field = form.fields.id(newField._id);
                field.label = newForm.label;
                field.placeholder = newField.placeholder;
                field.options = newField.options;
                return form.save();
            }
        )
    }


}
