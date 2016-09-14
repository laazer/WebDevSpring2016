(function()
{
	angular
		.module("JBSite")
		.controller("MainController", mainController);

    function mainController ($rootScope, $location) {
        $rootScope.$location = $location;
        $location.url();
				$rootScope.range = range;
				$rootScope.me = {
					name: "Jacob Brandt",
					slogan: "Software Developer - Noun - Mountain in Training",
					img:"./img/me.jpg",
					github: "https://github.com/laazer",
					linkedin: "https://www.linkedin.com/in/brandtjacob",
				};
				function range(n) {
						// if(!n) return [];
						return Array.apply(null, Array(n)).map(function (_, i) {return i;});
				}

    }
})();
