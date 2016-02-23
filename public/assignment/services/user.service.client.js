(function()
{
	angular
		.module("FormBuilderApp")
		.factory("UserService", UserService);
		
    function UserService ($rootScope) {
        var model = {
            users : [
                {"_id":123, "firstName":"Alice",  "lastName":"Wonderland","username":"alice",  "password":"alice"},
                {"_id":234, "firstName":"Bob",    "lastName":"Hope",      "username":"bob",    "password":"bob"},
                {"_id":345, "firstName":"Charlie","lastName":"Brown",     "username":"charlie","password":"charlie"},
                {"_id":456, "firstName":"Dan",    "lastName":"Craig",     "username":"dan",    "password":"dan"},
                {"_id":567, "firstName":"Edward", "lastName":"Norton",    "username":"ed",     "password":"ed"}
            ],
        findUserByUsernameAndPassword: findUserByUsernameAndPassword,

         
        };
        return model;
        
        function findUserByUsernameAndPassword(username, password, callback) {
            for (var u in model.users) {
                if (model.users[u].username === username && model.users[u].password == password) {
                     callback(model.users[u]);
                }
            }
            return callback(null);
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
            var lUser = {
               "_id" : userId,
               "firstName" : user.firstname,
               "lastName" : user.lastname,
               "username" : user.username,
               "password" : user.password,
           };
           for(var u in model.users) {
                if(model.user[u]._id == userId) {
                    model.users[u] = lUser;
                    break;
                }
            }
            callback(lUser);   
        }
        
        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }
    }
    
    
})();