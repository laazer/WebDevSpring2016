(function()
{
	angular
		.module("FormBuilderApp")
		.factory("UserService", UserService);

    function UserService ($rootScope, $q, $http) {
        var baseUrl = "/api/assignment/user";
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

        function findUserByUsername(username) {
            var deferred = $q.defer();
						var url = baseUrl + '?username=' + username;
            $http.jsonp(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findUserByUsernameAndPassword(username, password) {
            var deferred = $q.defer();
						var url = baseUrl + '?username=' + username + '&password=' + password;
            $http.get(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();
            $http.jsonp(baseUrl)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();
            $http.post(baseUrl, user)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();
            $http.delete(baseUrl + '/' + userId)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function updateUser(userId, user) {
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
