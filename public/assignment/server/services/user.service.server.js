module.exports = function(app, mongoose, db) {
    var model = require('../models/user.model.js')(mongoose, db);
    var resp = require("./resp.js")();

    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/loggedin",loggedin);
    app.post("/api/assignment/logout", logout);
    app.get("/api/assignment/user", getUserByUsername);
    app.get("/api/assignment/user", getUserByCredentials);
    app.put("/api/assignment/user/:id", updateUserById);
    app.post("/api/assignment/user", createUser);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser (req, res) {
        var user = req.body;
        model.createUser(user)
            .then(resp.defaultJsonCallBack(res), resp.notFound(res));
    }

    function loggedin(req, res) {
        res.json(req.session.newUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function getAllUsers (req, res) {
        if(req.query.username) {
            if(req.query.password) {
                getUserByCredentials(req, res);
            }
            else {
                getUserByUsername(req, res);
            }
        }
        else {
            var users = model.findAllUsers();
            res.json(users);
        }

    }

    function getUserById (req, res) {
        var id = req.params.id;
        var user = model.findUserById(id)
            .then(resp.defaultJsonCallBack(res), resp.notFound(res));
    }

    function getUserByCredentials (req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var credentials = {
            username: username,
            password: password
        };
        model.findUserByCredentials(credentials)
            .then(resp.defaultJsonCallBack(res), resp.notFound(res));
    }

    function getUserByUsername (req, res) {
        var username = req.query.username;
        model.findUserByUsername(username)
            .then(resp.defaultJsonCallBack(res), resp.notFound(res));
    }

    function updateUserById (req, res) {
        var id = req.params.id;
        var user = req.body;
        model.updateUser(id, user)
            .then(resp.defaultCallBack(res), resp.notFound(res));
    }

    function deleteUserById (req, res) {
        var id = req.params.id;
        model.deleteUser(id)
            .then (resp.defaultCallBack(res), resp.notFound(res));
    }

}
