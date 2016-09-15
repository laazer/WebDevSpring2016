(function()
{
	angular
		.module("JBSite")
		.controller("HomeController", homeController);

    function homeController ($scope, $rootScope, $location) {

				var defaultOptions = getOptions({barColor: '#18bc9c'})
				$scope.skills = [
						{name: "Java", rank: "95", options:defaultOptions},
						{name: "Python", rank: "77", options:defaultOptions},
						{name: "Android SDK", rank: "83", options:defaultOptions},
						{name: "MEAN Stack", rank: "75", options:defaultOptions},
						{name: "Git", rank: "75", options:defaultOptions},
						{name: "Scala", rank: "70", options:defaultOptions},
						{name: "C#", rank: "70", options:defaultOptions},
						{name: "Racket", rank: "55", options:defaultOptions},
				];
				$scope.skills = $scope.skills.sort(function(a, b) {
					return a.rank < b.rank;
				});

				$scope.projects = [
						{name:"Form Maker", slogan:"Simple Form Maker", img:"./img/forms.png", ref:"formModal", src:"./fm/"},
						{name:"Debate Forum", slogan:"Simple Debate Forum", img:"./img/gavel.png", ref:"debateModal", src:"./debate/"},
						{name:"Java Common Tools", slogan:"Useful Tools for Java", img:"./img/toolbox.jpg", ref:"commonsModal", src:"https://github.com/laazer/commons"},
						{name:"Portal++", slogan:"2D Portalish Game", img:"./img/portal.png", ref:"portalModal", src:"https://github.com/laazer/portalpp"},
						{name:"Scroggle", slogan:"Fun Word Game", img:"./img/scroggle.png", ref:"scroggleModal", src:"https://play.google.com/store/apps/details?id=com.laazer.scroggle"},
						{name:"Secure Chat", slogan:"Secure Chat Server and Client", img:"./img/secure-chat.png", ref:"chatModal", src:"https://github.com/blakelymadden/netsec_securechat"},
				];

				function getOptions(newOptions) {
					var options = {
								barColor: '#ef1e25',
								trackColor: '#f9f9f9',
								scaleColor: '#dfe0e0',
								scaleLength: 5,
								lineCap: 'circle',
								lineWidth: 20,
								size: 110,
								rotate: 0,
								animate: {
									duration: 1000,
									enabled: true
								}
							};
					for(item in newOptions) {
						options[item] = newOptions[item];
					}
					return options;
				}
    }
})();
