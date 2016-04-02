var model = require('./user.mock.json');
var q = require("q");

module.exports = function(mongoose, db) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('User', UserSchema);
    
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
           deferred.resolve(user);
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
            deferred.resolve(user);
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
            deferred.resolve(user);
          }
        })
        return defered.promise;
    }

    function findUserByUserId(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find(function(err, users){
           if(err) {
               deferred.reject(err);
           } else {
               deferred.resolve(users);
           }
        });
        return deferred.promise;
    }

    function deleteUserById(userId) {
      var deferred = q.defer();
       UserModel.remove({_id: userId}, function(err, status) {
           if(err) {
               deferred.reject(err);
           } else {
               deferred.resolve(status);
           }
       });
       return deferred.promise;
    }

    function updateUser(userId, user) {
      var deferred = q.defer();
      user.delete("_id");
      UserModel.update({_id: userId}, {$set: user}, function(err, user) {
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(user);
        }
      });
      return defered.promise;
    }

}
