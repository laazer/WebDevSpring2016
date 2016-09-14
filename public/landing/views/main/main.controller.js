(function()
{
	angular
		.module("JBSite")
		.controller("MainController", mainController);

    function mainController ($rootScope, $location, $anchorScroll) {
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

				$rootScope.gotoAnchor = function(newHash) {
					if ($location.hash() !== newHash) {
						// set the $location.hash to `newHash` and
						// $anchorScroll will automatically scroll to it
						$location.hash(newHash);
					} else {
						// call $anchorScroll() explicitly,
						// since $location.hash hasn't changed
						$anchorScroll();
					}
				};

    }
})();
