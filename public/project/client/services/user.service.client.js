(function()
{
	angular
		.module("DebateBuilderApp")
		.factory("UserService", UserService);

    function UserService ($rootScope, $q, $http) {
        var baseUrl = "/api/project/user";
				var baseFormatUrl = "/api/project/{0}";
				var model = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
						findUserById: findUserById,
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
						logoutUser();
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

				function findUserById(userId) {
						var url = baseUrl + '?userId=' + userId;
						return $http.get(url);
				}

        function findAllUsers() {
            return $http.get(baseUrl);
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
						if(user.username == "root") {
							$rootScope.isAdmin = true;
							return;
						}
						if(!user.phones) return;
						if (user.phones.indexOf("admin") >-1) {
							$rootScope.isAdmin = true;
						}
        }

				function logoutUser() {
						$rootScope.isLoggedIn = false;
						$rootScope.currentUser = null;
						$rootScope.isAdmin = false;
				}

        function getCurrentUser() {
            return $rootScope.currentUser;
        }
    }


})();
