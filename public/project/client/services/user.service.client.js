(function()
{
	angular
		.module("DebateBuilderApp")
		.factory("UserService", UserService);

    function UserService ($rootScope, $q, $http) {
        var baseUrl = "/api/project/user";
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
						var url = baseUrl + '?username=' + username;
            return $http.jsonp(url);
        }

        function findUserByUsernameAndPassword(username, password) {
						var url = baseUrl + '?username=' + username + '&password=' + password;
            return $http.get(url)
        }

        function findAllUsers() {
            return $http.jsonp(baseUrl);
        }

        function createUser(user) {
            return $http.post(baseUrl, user);
        }

        function deleteUserById(userId) {
            return $http.delete(baseUrl + '/' + userId);
        }

        function updateUser(userId, user) {
            return $http.put(baseUrl + '/' + userId, user);
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
