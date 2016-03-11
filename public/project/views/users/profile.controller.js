(function()
{
	angular
		.module("DebateApp")
		.controller("ProfileController", profileController);
		
    function profileController($scope, $rootScope, $location, UserService) {
        var pc = this;

        $scope.error = null;
        $scope.message = null;

        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $location.url("/");
        }
        
        $scope.update = updateUser;
        
        function updateUser (user) {
            // same validation as register
            $scope.error = null;
            $scope.message = null;

            UserService.updateUser($rootScope.currentUser._id, user, function(user) {
                pc.user = angular.copy(user);
                if (pc.user) {
                    $scope.message = "User updated successfully";
                    UserService.setCurrentUser(pc.user);
                } else {
                    $scope.message = "Unable to update the user";
                }
            });
        }
    }
})();