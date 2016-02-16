(function()
{
	angular
		.module("FormBuilderApp")
		.controller("MainController", MainController);
		
    function MainController ($scope, $location) {
        $scope.$location = $location;
        $scope.isLoggedIn = false;
        $scope.isAdmin = false;
        console.log($location.url());
    }
})();