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
					img: ["./img/me.jpg"],
					github: "https://github.com/laazer",
					linkedin: "https://www.linkedin.com/in/brandtjacob",
				};
				$rootScope.me.getRandomImg = function() {
					var img = $rootScope.me.img;
					var result = img[Math.floor(Math.random() * (img.length - 1))];
					return result;
				};
				function range(n) {
						// if(!n) return [];
						return Array.apply(null, Array(n)).map(function (_, i) {return i;});
				}

    }
})();
