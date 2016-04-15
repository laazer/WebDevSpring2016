(function()
{
	angular
		.module("DebateBuilderApp")
		.controller("RegisterController", registerController);

        function registerController($location, $scope, UserService) {
            var rc = this;
            $scope.message = null;
            $scope.register = register;

            $scope.currentUser = UserService.getCurrentUser();
            if ($scope.currentUser) {
                $location.url("/");
            }

            function register(user) {
                $scope.message = null;
                if (user == null) {
                    $scope.message = "Please fill in the required fields";
                    return;
                }
                if (!user.username) {
                    $scope.message = "Please provide a username";
                    return;
                }
                if (!user.password || !user.password2) {
                    $scope.message = "Please provide a password";
                    return;
                }
                if (user.password != user.password2) {
                    $scope.message = "Passwords must match";
                    return;
                }
								if (!user.email) {
										$scope.message = "Please provide an email address";
										return;
								}
                UserService.findUserByUsername(user.username).then(function(response) {
										var lUser = response.data;
										if (lUser) {
												$scope.message = "User already exists";
												return;
										}
										UserService.createUser(user).then(function(nUser) {
												user = nUser;
												UserService.setCurrentUser(user);
												$location.url("/profile");
										});
									}, function(err) {
											UserService.createUser(user).then(function(response) {
													var user = response.data;
													UserService.setCurrentUser(user);
													$location.url("/profile");
											});
									});
            };
        }
})();
