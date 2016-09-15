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
					resume: "./assets/resume.pdf",
					aboutMe1: "I'm an evolved form of code monkey. I squash bugs, talk to rubber ducks, and pray that the coffee maker is still working. I build websites, Mobile Apps, and the occasional video game.",
					aboutMe2: "I roam the streets fighting crime as my alter ego, That Guy. I also can be found at the local gym, picking things up and then putting them down. I also might be in front of a stove top cooking dinner or at my computer watching Netflix and playing video games.",
				};
				$rootScope.me.getRandomImg = function() {
					var img = $rootScope.me.img;
					var result = img[getRandomInt(0, img.length - 1)];
					return result;
				};
				function range(n) {
						// if(!n) return [];
						return Array.apply(null, Array(n)).map(function (_, i) {return i;});
				}

				function getRandomInt(min, max) {
					return Math.floor(Math.random() * (max - min + 1)) + min;
				}

    }
})();
