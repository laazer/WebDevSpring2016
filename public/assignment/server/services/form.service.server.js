var model = require('../models/form.model.js')();

module.exports = function(app) {

    app.post('/api/assignment/user/:userId/form', function(req, res) {
        var result = model.createFormForUser(req.params.userId, req.body);
        defaultResponse(result, res);
    });
    app.get('/api/assignment/user/:userId/form', function(req, res) {
        var result = model.findAllFormsForUser(req.params.userId);
        defaultJsonResponse(result, res);
    });
    app.get('/api/assignment/form/:formId', function(req, res) {
        var result = model.findFormById(req.params.formId);
        defaultJsonResponse(result, res);
    });
    app.delete('/api/assignment/form/:formId', function(req, res) {
        var result = model.deleteFormById(req.params.formId);
        defaultResponse(result, res);
    });
    app.put('/api/assignment/form/:formId', function(req, res) {
        var result = model.updateFormById(req.params.formId, req.body);
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
