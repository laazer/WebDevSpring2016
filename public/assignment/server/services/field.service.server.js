module.exports = function(app, uuid, mongoose, db) {
    var model = require('../models/form.model.js')(uuid, mongoose, db);
    var resp = require("./resp.js")();

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
            .then(resp.defaultJsonCallBack(res), resp.notFound(res));
    }

    function updateAllFields(req,res) {
        model.updateAllFieldsInForm(req.params.formId, req.body)
          .then(resp.defaultJsonCallBack(res), resp.notFound(res));
    }

    function getAllFieldsByFormId(req, res) {
        var formId = req.params.formId;
        model.findAllFieldsForFrom(formId)
          .then(resp.defaultJsonCallBack(res), resp.notFound(res));
    }

    function getFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.findFieldById(formId,fieldId)
          .then(resp.defaultJsonCallBack(res), resp.notFound(res));
    }

    function updateFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;
        model.updateFieldById(formId, fieldId, newField)
            .then(resp.defaultJsonCallBack(res), resp.notFound(res));
    }

    function deleteFieldById (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.deleteFieldById(formId,fieldId)
            .then(resp.defaultJsonCallBack(res), resp.notFound(res));
    }
}
