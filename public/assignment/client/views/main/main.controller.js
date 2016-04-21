(function()
{
	angular
		.module("FormBuilderApp")
		.controller("MainController", mainController);

		function mainController ($rootScope, $location, UserService) {
        $rootScope.$location = $location;
        $rootScope.isLoggedIn = false;
        $rootScope.isAdmin = false;
        $location.url();
				$rootScope.range = range;
				logIn();

				function logIn() {
						UserService.loggedin().then(function(res) {
								var user = res.data;
								if(user) {
									UserService.setCurrentUser(user);
								}
						}, function(err) {});
				}

				function range(n) {
						// if(!n) return [];
						return Array.apply(null, Array(n)).map(function (_, i) {return i;});
				}
		}
})();
