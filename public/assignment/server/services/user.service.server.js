var passport  = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, mongoose, db) {
    var model = require('../models/user.model.js')(mongoose, db);
    var resp = require("./resp.js")();

    app.get("/api/assignment/loggedin",loggedin);
    app.get("/api/assignment/logout", logout);
    app.get("/api/assignment/user", getUser);
    app.put("/api/assignment/user/:id", updateUserById);
    app.post("/api/assignment/user", createUser);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.post("/api/assignment/login", passport.authenticate("assignment"), login);

    passport.use('assignment', new LocalStrategy(
      function (username, password, done) {
        model.findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
        }
    ));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.findUserByUserId(user._id)
            .then(
                function(user) {
                    done(null, user);
                },
                function(err) {
                    done(err, null);
                }
            );
      }

    function createUser(req, res) {
          var user = req.body;
          if(!req.session.user) req.session.user = user;
          model.createUser(user)
              .then(resp.defaultJsonCallBack(res));
      }

      function login(req, res) {
        var credentials = req.body;
        model.findUserByCredentials(credentials)
            .then(function(result) {
              if(result) {
                req.session.user = result;
              }
              resp.defaultJsonResponse(result, res)
            });
      }

      function loggedin(req, res) {
          resp.defaultJsonResponse(req.session.user, res);
      }

      function logout(req, res) {
          req.session.destroy();
          res.send(200);
      }

      function getUser (req, res) {
          var username = req.query.username;
          var password = req.query.password;
          var id = req.query.userId;
          if(username && password) return getUserByCredentials(req, res);
          if(username) return getUserByUsername(req, res);
          if(id) return getUserById(req, res);
          else getAllUsers(req, res);
      }

      function getAllUsers (req, res) {
          model.findAllUsers()
              .then(resp.defaultJsonCallBack(res));
      }

      function getUserById (req, res) {
          var id = req.query.userId;
          model.findUserByUserId(id)
              .then(resp.defaultJsonCallBack(res));
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
          model.deleteUserById(id)
              .then (resp.defaultCallBack(res));
      }

}
