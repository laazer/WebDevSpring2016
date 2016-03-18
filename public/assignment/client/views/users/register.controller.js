(function()
{
	angular
		.module("FormBuilderApp")
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
                UserService.findUserByUsername(user.username).then(function(user) {
                    rc.user = user
                });
                if (rc.user) {
                    $scope.message = "User already exists";
                    return;
                }
                UserService.createUser($scope.user).then(function(user) {
                    rc.user = user;
                    UserService.setCurrentUser(rc.user);
                    $location.url("/profile");
                });
            };
        }
})();