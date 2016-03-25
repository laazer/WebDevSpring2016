module.exports = function(app, uuid) {
    var model = require('../models/debate.model.js')(uuid);

    app.post('/api/project/owner/:ownerId/debate', function(req, res) {
        var result = model.createFormForUser(req.params.ownerId, req.body);
        defaultResponse(result, res);
    });
    app.get('/api/project/owner/:userId/deabte', function(req, res) {
        var result = model.findAllDebatesForUser(req.params.userId);
        defaultJsonResponse(result, res);
    });
    app.get('/api/project/debate/:debateId', function(req, res) {
        var result = model.findDebateById(req.params.formId);
        defaultJsonResponse(result, res);
    });
    app.delete('/api/project/debate/:debateId', function(req, res) {
        var result = model.deleteDebateById(req.params.formId);
        defaultResponse(result, res);
    });
    app.put('/api/project/debate/:debateId', function(req, res) {
        var result = model.updateDebateById(req.params.formId, req.body);
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
