var model = require('./user.mock.json');
var q = require("q");

module.exports = function(mongoose, db) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel;
    if (mongoose.models.Debate) {
      UserModel = mongoose.model('User');
    } else {
      UserModel = mongoose.model('User', UserSchema);
    }

    var api = {
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserByUserId: findUserByUserId,
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };
    return api;

    function createUser(user) {
       var defered = q.defer();
       UserModel.create(user, function(err, user) {
         if(err) {
           defered.reject(err);
         } else {
           defered.resolve(user);
         }
       })
       return defered.promise;
    }

    function findUserByUsername(username) {
        var defered = q.defer();
        UserModel.findOne({username: username}, function(err, user) {
          if(err) {
            defered.reject(err);
          } else {
            defered.resolve(user);
          }
        })
        return defered.promise;
    }

    function findUserByCredentials(credentials) {
        var user = null;
        var username = credentials.username;
        var password = credentials.password;
        var defered = q.defer();
        UserModel.findOne({username: username, password: password}, function(err, user) {
          if(err) {
            defered.reject(err);
          } else {
            defered.resolve(user);
          }
        })
        return defered.promise;
    }

    function findUserByUserId(userId) {
        var defered = q.defer();
        UserModel.findById(userId, function(err, user){
            if(err) {
                defered.reject(err);
            } else {
                defered.resolve(user);
            }
        });
        return defered.promise;
    }

    function findAllUsers() {
        var defered = q.defer();
        UserModel.find(function(err, users){
           if(err) {
               defered.reject(err);
           } else {
               defered.resolve(users);
           }
        });
        return defered.promise;
    }

    function deleteUserById(userId) {
      var defered = q.defer();
       UserModel.remove({_id: userId}, function(err, status) {
           if(err) {
               defered.reject(err);
           } else {
               defered.resolve(status);
           }
       });
       return defered.promise;
    }

    function updateUser(userId, user) {
      var defered = q.defer();
      user.delete({_id: userId});
      UserModel.update({_id: userId}, {$set: user}, function(err, user) {
        if(err) {
            defered.reject(err);
        } else {
            defered.resolve(user);
        }
      });
      return defered.promise;
    }

}
