var model = require('../models/user.model.js')();

module.exports = function(app) {
    app.post('/api/project/user', function(req, res) {
        var result = model.createUser(req.body);
        defaultJsonResponse(result, res);
    });
    app.get('/api/project/user', function(req, res) {
        var result = model.findUserByUsername(req.query.username);
        defaultJsonResponse(result, res);
    });
    app.get('/api/project/user/:userId', function(req, res) {
        var result = model.findUserByUserId(req.params.userId);
        defaultJsonResponse(result, res);
    });
    app.get('/api/project/user', function(req, res) {
        var result = model.findUserByCredentials({'username': req.query.username,
                                            'password': req.query.pasword});
        defaultJsonResponse(result, res);
    });
    app.get('/api/project/user', function(req, res) {
        var result = model.findAllUsers();
        defaultJsonResponse(result, res);
    });
    app.delete('/api/project/user/:userId', function(req, res) {
        var result = model.deleteUserById(req.params.userId);
        defaultResponse(result, res);
    });
    app.put('/api/project/user/:userId', function(req, res) {
        var result = model.updateUser(req.params.userId, req.body);
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
