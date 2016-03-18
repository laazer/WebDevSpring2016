var model = require('../models/form.model.js')();

module.exports = function(app) {
    
    app.post('/api/assignment/user/:userId/form', function(req, res) {
        var result = model.createFormForUser(req.param.userId, req.body);
        defaultResponse(result, res);
    });
    app.get('/api/assignment/user/:userId/form', function(req, res) {
        var result = model.findAllFormsForUser(req.param.userId);
        defaultJsonResponse(result, res);
    });
    app.get('/api/assignment/form/:formId', function(req, res) {
        var result = model.findFormById(req.param.formId);
        defaultJsonResponse(result, res);
    });
    app.delete('/api/assignment/form/:formId', function(req, res) {
        var result = model.deleteFormById(req.param.formId);
        defaultResponse(result, res);
    });
    app.put('/api/assignment/form/:formId', function(req, res) {
        var result = model.updateFormById(req.param.formId, req.body);
        defaultResponse(result, res);
    });
    
    //generic 404 response
    function notFound(res) {
        res.status(404).send("Not Found");
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