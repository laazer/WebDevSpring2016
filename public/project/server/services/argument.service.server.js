module.exports = function(app, uuid) {
    var model = require('../models/debate.model.js')(uuid);

    app.get("/api/project/debate/:debateId/argument", function(req, res) {
        var debate = model.findFormById(req.params.debateId).arguments;
        defaultJsonResponse(debate, res);
    });

    app.get("/api/project/debate/:debateId/argument/:argumentId", function(req, res) {
        var debate = model.findFormById(req.params.debateId).arguments.find(
          function(x) { x == req.params.argumentId; });
        defaultJsonResponse(debate, res);
    });

    app.delete("/api/project/debate/:debateId/argument/:argumentId", function(req, res) {
        var result = model.deleteFieldById(req.params.debateId, req.params.argumentId);
        defaultJsonResponse(debate, res);
    });

    app.post("/api/project/debate/:debateId/argument", function(req, res) {
        var result = model.createFieldForForm(req.params.debateId, req.body);
        defaultJsonResponse(result, res);
    });

    app.put("/api/project/debate/:debateId/argument/:argumentId", function(req, res) {
        var result = model.updateFieldById(req.param.debateId, req.params.argumentId, req.body);
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
