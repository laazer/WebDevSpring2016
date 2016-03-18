(function()
{
	angular
		.module("FormBuilderApp")
		.factory("UserService", UserService);
		
    function UserService ($rootScope, $q) {
        var model = {
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
        
        var baseUrl = "/api/assignment/user";
        
        function findUserByUsername(username, callback) {
            var deferred = $q.defer();
            $http.jsonp(baseUrl, {'params': {'username' : username}})
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
        
        function findUserByUsernameAndPassword(username, password) {
            var deferred = $q.defer();
            $http.jsonp(baseUrl, {'params': {'username' : username, 'password': password}})
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
        
        function findAllUsers(callback) {
            var deferred = $q.defer();
            $http.jsonp(baseUrl)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
        
        function createUser(user, callback) {
            var deferred = $q.defer();
            $http.post(baseUrl, user)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
        
        function deleteUserById(userId, callback) {
            var deferred = $q.defer();
            $http.delete(baseUrl + '/' + userId)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;   
        }
        
        function updateUser(userId, user, callback) {
            var deferred = $q.defer();
            $http.put(baseUrl + '/' + userId, user)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
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