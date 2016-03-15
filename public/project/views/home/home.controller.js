(function()
{
	angular
		.module("DebateApp")
		.controller("HomeController", HomeController);
		
    function HomeController ($rootScope, $location) {
        $rootScope.range = range;        
            
        function range(n) {
            return Array.apply(null, Array(n)).map(function (_, i) {return i;});
        }
        
    }
})();