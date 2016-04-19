(function()
{
	angular
		.module("DebateBuilderApp")
		.factory("UserService", UserService);

    function UserService ($rootScope, $q, $http) {
        var baseUrl = "/api/project/user";
				var baseFormatUrl = "/api/project/user/{0}";
				var model = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
						login: login,
						logout: logout,
						loggedin: loggedin
        };
        return model;


				function login(username, password) {
					  var creds = {
	              username: username,
	              password: password
	          };
						var url = baseFormatUrl.format("login");
						return $http.post(url, creds);
				}

				function logout() {
						var url = baseFormatUrl.format("logout");
						return $http.get(url);
				}

				function loggedin() {
						var url = baseFormatUrl.format("loggedin");
						return $http.get(url);
				}

        function findUserByUsername(username) {
						var url = baseUrl + '?username=' + username;
            return $http.get(url);
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
						if(!user.roles) return;
						if (user.roles.indexOf("admin") >-1) {
							$rootScope.isAdmin = true;
						}
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }
    }


})();
