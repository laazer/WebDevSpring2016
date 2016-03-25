module.exports = function(app, uuid) {
    var model = require('../models/form.model.js')(uuid);

    app.get("/api/assignment/form/:formId/field", function(req, res) {
        var fields = model.findFormById(req.params.formId).fields;
        defaultJsonResponse(fields, res);
    });

    app.get("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
        var field = model.findFormById(req.params.formId).fields.find(function(x) { x == req.params.fieldId; });
        defaultJsonResponse(field, res);
    });

    app.delete("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
        var result = model.deleteFieldById(req.params.formId, req.params.fieldId);
        defaultJsonResponse(result, res);
    });

    app.post("/api/assignment/form/:formId/field", function(req, res) {
        var result = model.createFieldForForm(req.params.formId, req.body);
        defaultJsonResponse(result, res);
    });

    app.put("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
        var result = model.updateFieldById(req.param.formId, req.params.fieldId, req.body);
        defaultResponse(result, res);
    });

    //generic 404 response
    function notFound(res) {
        res.status(200).send(null);
    }

    function success(res) {
        res.status(200).send("success");
    }

    function defaultJsonResponse(njson, res) {
        if(njson) res.json(njson);
        else notFound(res);
    }

    function defaultResponse(nobj, res) {
        if(nobj) success(res);
        else notFound(res);
    }
}
