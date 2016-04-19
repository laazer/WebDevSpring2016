(function()
{
	angular
		.module("DebateBuilderApp")
		.controller("HeaderController", HeaderController);

    function HeaderController ($scope, $rootScope, $location, UserService) {

	    $scope.logout = logout;
			$scope.search = search;

		  function logout() {
				 UserService.logout();
         $rootScope.currentUser = null;
         $rootScope.isLoggedIn = false;
         $location.url("/");
       }
			 
			 function search(content) {
				 $location.url("/debate/search/content=" + content);
			 }

		}

})();
