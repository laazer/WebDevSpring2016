(function()
{
	angular
		.module("FormBuilderApp")
		.controller("MainController", mainController);
		
    function mainController ($scope, $location) {
        $scope.$location = $location;
        $scope.isLoggedIn = false;
        $scope.isAdmin = false;
        console.log($location.url());
    }
})();