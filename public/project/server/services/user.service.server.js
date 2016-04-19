var passport  = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, mongoose, db) {
    var model = require('../models/user.model.js')(mongoose, db);
    var resp = require("./resp.js")();

    app.get("/api/project/user", getAllUsers);
    app.get("/api/project/user/:id", getUserById);
    app.post("/api/assignment/login", passport.authenticate("project"), login);
    app.get("/api/project/loggedin",loggedin);
    app.post("/api/project/logout", logout);
    app.get("/api/project/user", getUserByUsername);
    app.get("/api/project/user", getUserByCredentials);
    app.put("/api/project/user/:id", updateUserById);
    app.post("/api/project/user", createUser);
    app.delete("/api/project/user/:id", deleteUserById);

    passport.use('project', new LocalStrategy(
      function (username, password, done) {
        model.findUserByCredentials({username: username, password: password})
            .then(resp.defaultJsonCallBack(res))
          }
      ));
      passport.serializeUser(serializeUser);
      passport.deserializeUser(deserializeUser);


    function createUser (req, res) {
        var user = req.body;
        model.createUser(user)
            .then(resp.defaultJsonCallBack(res), resp.notFound(res));
    }

    function login(req, res) {
      var user = req.user;
      resp.defaultJsonResponse(req, user);
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
            .then(resp.defaultJsonCallBack(res));
    }

    function getUserByUsername (req, res) {
        var username = req.query.username;
        model.findUserByUsername(username)
            .then(resp.defaultJsonCallBack(res));
    }

    function updateUserById (req, res) {
        var id = req.params.id;
        var user = req.body;
        model.updateUser(id, user)
            .then(resp.defaultCallBack(res));
    }

    function deleteUserById (req, res) {
        var id = req.params.id;
        model.deleteUser(id)
            .then (resp.defaultCallBack(res));
    }

}
