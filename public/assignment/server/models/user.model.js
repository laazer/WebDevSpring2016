var model = require('./user.mock.json');

module.exports = function() {
    
    var api {
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
        var u = {
           "_id" : (new Date).getTime(),
           "firstName" : user.firstname,
           "lastName" : user.lastname,
           "username" : user.username,
           "password" : user.password,
           "email" : user.email,
        };
       model.users.push(u);
       return u;
    }
    
    function findUserByUsername(username) {
        for (var u in model.users) {
               if(model.users[u].username == username) {
                   return model.users[u];
               }
        }
        return null;
    }
    
    function findUserByUserId(userId) {
        for (var u in model.users) {
               if(model.users[u]._id == userId) {
                   return model.users[u];
               }
        }
        return null;
    }
    
    function findUserByCredentials(credentials) {
        var user = null;
        var username = credentials.username;
        var password = credentials.password;
        for (var u in model.users) {
            user = model.users[u];
            if (user.username === username && user.password == password) {
                 return user;
            }
        }
        return null;
    }
    
    function findAllUsers() {
        return model.users;
    }
    
    function deleteUserById(userId) {
        for(var u in model.users) {
            if(model.user[u]._id == userId) {
                model.users.splice(u, 1);
                return true;
            }
        }
        return false;    
    }
    
    function updateUser(userId, user) {
       var cuser = null;
       for(var u in model.users) {
            if(model.users[u]._id == userId) {
                cuser = model.users[u];
                model.users[u] = {
                    "_id" : userId,
                    "firstName" : user.firstName ? user.firstName : cuser.firstName,
                    "lastName" : user.lastName ? user.lastName : cuser.lastName,
                    "username" : user.username ? user.username : cuser.username,
                    "password" : user.password ? user.password : cuser.password,
                    "email" : user.email ? user.email : cuser.email,
                }
                cuser = model.users[u];
                return true;
            }
        }
        return false;   
    }
    
}