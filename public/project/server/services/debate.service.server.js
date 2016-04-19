module.exports = function(app, uuid, mongoose, db)  {
    var model = require('../models/debate.model.js')(uuid, mongoose, db);
    var resp = require("./resp.js")();

    app.get("/api/project/user/:ownerId/debate", getAllDebatesByUserId);
    app.get("/api/project/debate/:debateId", getDebateById);
    app.put("/api/project/debate/:debateId",updateDebateById);
    app.post("/api/project/user/:ownerId/debate",createDebateForUser);
    app.delete("/api/project/debate/:debateId",deleteDebateById);
    app.get('/api/project/debate/', getAllDebates);

    function createDebateForUser(req, res) {
        var userId = req.params.ownerId;
        var debate = req.body;
        debate.darguments = [];
        model.createDebateForUser(userId, debate)
          .then(resp.defaultJsonCallBack(res));
    }

    function getAllDebatesByUserId(req, res) {
        var userId = req.params.ownerId;
        model.findAllDebatesForUser(userId)
          .then(resp.defaultJsonCallBack(res));
    }

    function getAllDebates(req, res) {
        var userId = req.params.ownerId;
        model.findAllDebates(userId)
          .then(resp.defaultJsonCallBack(res));
    }

    function getDebateById(req, res) {
        var debateId = req.params.debateId;
        model.findDebateById(debateId)
            .then(resp.defaultJsonCallBack(res));
    }

    function updateDebateById(req, res) {
        var debateId = req.params.debateId;
        var newDebate = req.body;
        model
            .updateDebateById(debateId, newDebate)
              .then(resp.defaultJsonCallBack(res));
    }

    function deleteDebateById (req, res) {
        var debateId = req.params.debateId;
        model
            .deleteDebateById(debateId)
            .then(resp.defaultJsonCallBack(res));
    }
}
