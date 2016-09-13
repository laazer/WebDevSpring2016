(function()
{
	angular
		.module("JBSite")
		.controller("MainController", mainController);

    function mainController ($rootScope, $location) {
        $rootScope.$location = $location;
        $location.url();
		$rootScope.range = range;

		function range(n) {
				// if(!n) return [];
				return Array.apply(null, Array(n)).map(function (_, i) {return i;});
		}

    }
})();
