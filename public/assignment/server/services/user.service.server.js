var model = require('../models/user.model.js')();

module.exports = function(app) {
    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user', function(req, res) {
        var result = findUserByUsername(req.query.username);
        defaultJsonResponse(result);
    });
    app.get('/api/assignment/user/:userId', findUserByUserId);
    app.get('/api/assignment/user', function(req, res) {
        var result = findUserByCredentials({'username': req.query.username, 
                                            'password': req.query.pasword});
        defaultJsonResponse(result);
    });
    app.get('/api/assignment/user', findAllUsers);
    app.delete('/api/assignment/user/:userId', deleteUserById);
    app.put('/api/assignment/user/:userId', updateUser);
    
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