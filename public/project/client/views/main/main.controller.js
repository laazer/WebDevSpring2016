(function()
{
	angular
		.module("DebateBuilderApp")
		.controller("MainController", mainController);

    function mainController ($rootScope, $location) {
        $rootScope.$location = $location;
        $rootScope.isLoggedIn = false;
        $rootScope.isAdmin = false;
        $location.url();
				$rootScope.range = range;

				function range(n) {
						// if(!n) return [];
						return Array.apply(null, Array(n)).map(function (_, i) {return i;});
				}

    }
})();
