module.exports = function(app, uuid) {
    var model = require('../models/debate.model.js')(uuid);

    app.get("/api/project/form/:formId/field", function(req, res) {
        var form = model.findFormById(req.params.formId).fields;
        defaultJsonResponse(form, res);
    });

    app.get("/api/project/form/:formId/field/:fieldId", function(req, res) {
        var form = model.findFormById(req.params.formId).fields.find(function(x) { x == req.params.fieldId; });
        defaultJsonResponse(form, res);
    });

    app.delete("/api/project/form/:formId/field/:fieldId", function(req, res) {
        var result = model.deleteFieldById(req.params.formId, req.params.fieldId);
        defaultJsonResponse(form, res);
    });

    app.post("/api/project/form/:formId/field", function(req, res) {
        var result = model.createFieldForForm(req.params.formId, req.body);
        defaultJsonResponse(result, res);
    });

    app.put("/api/project/form/:formId/field/:fieldId", function(req, res) {
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
        if(njson) success(res);
        else notFound(res);
    }
}
