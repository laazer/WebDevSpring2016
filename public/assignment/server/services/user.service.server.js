var model = require('../models/user.model.js')();

module.exports = function(app) {
    app.post('/api/assignment/user', function(req, res) {
        var result = model.createUser(req.body);
        defaultJsonResponse(result, res);
    });
    app.get('/api/assignment/user', function(req, res) {
        var result = model.findUserByUsername(req.query.username);
        defaultJsonResponse(result, res);
    });
    app.get('/api/assignment/user/:userId', function(req, res) {
        var result = model.findUserByUserId(req.params.userId);
        defaultJsonResponse(result);
    });
    app.get('/api/assignment/user', function(req, res) {
        var result = model.findUserByCredentials({'username': req.query.username, 
                                            'password': req.query.pasword});
        defaultJsonResponse(result, res);
    });
    app.get('/api/assignment/user', function(req, res) {
        var result = model.findAllUsers();
        defaultJsonResponse(result, res);
    });
    app.delete('/api/assignment/user/:userId', function(req, res) {
        var result = model.deleteUserById(req.params.userId);
        defaultResponse(result);
    });
    app.put('/api/assignment/user/:userId', function(req, res) {
        var result = model.updateUser(req.params.userId, req.body);
        defaultResponse(result);
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