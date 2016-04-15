module.exports = function(app, uuid, mongoose, db) {
    var model = require('../models/debate.model.js')(uuid, mongoose, db);
    var resp = require("./resp.js")();

    app.get("/api/assignment/debate/:debateId/argument", getAllArgumentsByDebateId);
    app.get("/api/assignment/debate/:debateId/argument/:argumentId", getArgumentById);
    app.put("/api/assignment/debate/:debateId/argument/:argumentId",updateArgumentById);
    app.post("/api/assignment/debate/:debateId/argument",createArgumentForDebate);
    app.delete("/api/assignment/debate/:debateId/argument/:argumentId",deleteArgumentById);

    function createArgumentForDebate(req, res) {
        var debateId = req.params.debateId;
        var argument = req.body;
        model.createArgumentForDebate(debateId, argument)
            .then(resp.defaultJsonCallBack(res));
    }

    function getAllArgumentsByDebateId(req, res) {
        var debateId = req.params.debateId;
        model.findDebateById(debateId)
          .then(function(result) {
            resp.defaultJsonResponse(result.arguments, res);
          });
    }

    function getArgumentById(req, res) {
        var debateId = req.params.debateId;
        var argumentId = req.params.argumentId;
        model.findArgumentById(debateId,argumentId)
          .then(resp.defaultJsonCallBack(res));
    }

    function updateArgumentById(req, res) {
        var debateId = req.params.debateId;
        var argumentId = req.params.argumentId;
        var newArgument = req.body;
        model.updateArgumentById(debateId, argumentId, newArgument)
            .then(resp.defaultJsonCallBack(res));
    }

    function deleteArgumentById (req, res) {
        var debateId = req.params.debateId;
        var argumentId = req.params.argumentId;
        model.deleteArgumentById(debateId,argumentId)
            .then(resp.defaultJsonCallBack(res));
    }
}
