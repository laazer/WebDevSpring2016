module.exports = function(app, uuid, mongoose, db) {
    var model = require('../models/form.model.js')(uuid, mongoose, db);
    var resp = require("./resp.js")();

    app.get("/api/assignment/user/:userId/form", getAllFormsByUserId);
    app.get("/api/assignment/form/:formId", getFormById);
    app.put("/api/assignment/form/:formId",updateFormById);
    app.post("/api/assignment/user/:userId/form",createFormForUser);
    app.delete("/api/assignment/form/:formId",deleteFormById);

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        form.fields = [];
        model.createFormForUser(userId, form)
          .then(resp.defaultJsonCallBack(res));
    }

    function getAllFormsByUserId(req, res) {
        var userId = req.params.userId;
        model.findAllFormsForUser(userId)
          .then(resp.defaultJsonCallBack(res));
    }

    function getFormById(req, res) {
        var formId = req.params.formId;
        model.findFromById(formId)
            .then(resp.defaultJsonCallBack(res));
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var newForm = req.body;
        model
            .updateFormById(formId, newForm)
              .then(resp.defaultJsonCallBack(res));
    }

    function deleteFormById (req, res) {
        var formId = req.params.formId;
        model
            .deleteFormById(formId)
            .then(resp.defaultJsonCallBack(res));
    }
}
