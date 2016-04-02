module.exports = function(app, uuid) {
    var model = require('../models/form.model.js')(uuid, mongoose, db);

    app.get("/api/assignment/form/:formId/field", getAllFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateFieldById);
    app.put("/api/assignment/form/:formId/field",updateAllFields);
    app.post("/api/assignment/form/:formId/field",createFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldById);

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        model.createField(formId, field)
            .then(
                function(field){
                    res.json(field);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function updateAllFields(req,res) {
        model.updateAllFieldsInForm(req.params.formId, req.body)
            .then(
                function(field) {
                    res.json(field);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllFieldsByFormId(req, res) {
        var formId = req.params.formId;
        model.findAllFieldsForFrom(formId)
            .then(
                function(field) {
                    res.json(field)
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.findFieldById(formId,fieldId)
            .then(
                function(field) {
                    res.json(field);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;
        model.updateFieldById(formId, fieldId, newField)
            .then(
                function(field) {
                    res.json(field);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFieldById (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.deleteFieldById(formId,fieldId)
            .then(
                function (field) {
                    res.json(field);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}
