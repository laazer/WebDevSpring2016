module.exports = function(app, mongoose, db) {
    var model = require('../models/user.model.js')(mongoose, db);

    app.post('/api/assignment/user', function(req, res) {
        model.createUser(req.body).then(function(result) {
          defaultJsonResponse(result, res);
        });
    });
    app.get('/api/assignment/user', function(req, res) {
        model.findUserByUsername(req.query.username).then(function(result){
          defaultJsonResponse(result, res);
        });
    });
    app.get('/api/assignment/user/:userId', function(req, res) {
        model.findUserByUserId(req.params.userId).then(function(result){
          defaultJsonResponse(result, res);
        });
    });
    app.get('/api/assignment/user', function(req, res) {
        model.findUserByCredentials({'username': req.query.username,
                                            'password': req.query.pasword}).then(function(result){
                                                    defaultJsonResponse(result, res);
                                            });
    });
    app.get('/api/assignment/user', function(req, res) {
        model.findAllUsers().then(function(result) {
          defaultJsonResponse(result, res);
        });
    });
    app.delete('/api/assignment/user/:userId', function(req, res) {
        model.deleteUserById(req.params.userId).then(function(result){
          defaultResponse(result, res);
        });
    });
    app.put('/api/assignment/user/:userId', function(req, res) {
        model.updateUser(req.params.userId, req.body).then(function(result) {
          defaultResponse(result, res);
        });
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
