(function()
{
	angular
		.module("FormBuilderApp")
		.factory("UserService", UserService);
		
    function UserService ($rootScope) {
        var model = {
            users : [
                {"_id":123, "firstName":"Alice",  "lastName":"Wonderland","username":"alice",  "password":"alice", "email":"alice@foo.com"},
                {"_id":234, "firstName":"Bob",    "lastName":"Hope",      "username":"bob",    "password":"bob", "email":"bob@foo.com"},
                {"_id":345, "firstName":"Charlie","lastName":"Brown",     "username":"charlie","password":"charlie", "email":"charlie@foo.com"},
                {"_id":456, "firstName":"Dan",    "lastName":"Craig",     "username":"dan",    "password":"dan", "email":"dan@bar.com"},
                {"_id":567, "firstName":"Edward", "lastName":"Norton",    "username":"ed",     "password":"ed", "email":"ed@baz.com"}
            ],
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };
        return model;
        
        function findUserByUsername(username, callback) {
            for (var u in model.users) {
                   if(model.users[u].username == username) {
                       callback(model.users[u]);
                       break;
                   }
            }
            callback(null);
        }
        
        function findUserByUsernameAndPassword(username, password, callback) {
            var user = null;
            for (var u in model.users) {
                user = model.users[u];
                if (user.username === username && user.password == password) {
                     callback(user);
                     break;
                }
            }
            return callback(user);
        }
        
        function findAllUsers(callback) {
            callback(model.users)
        }
        
        function createUser(user, callback) {
           var u = {
               "_id" : (new Date).getTime(),
               "firstName" : user.firstname,
               "lastName" : user.lastname,
               "username" : user.username,
               "password" : user.password,
               "email" : user.email,
           };
           model.users.push(u);
           callback(u);
        }
        
        function deleteUserById(userId, callback) {
            for(var u in model.users) {
                if(model.user[u]._id == userId) {
                    model.users.splice(u, 1);
                    break;
                }
            }
            callback(model.users);    
        }
        
        function updateUser(userId, user, callback) {
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
                    break;
                }
            }
            callback(cuser);   
        }
        
        function setCurrentUser(user) {
            $rootScope.isLoggedIn = true;
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }
    }
    
    
})();