(function()
{
	angular
		.module("JBSite")
		.controller("HomeController", homeController);

    function homeController ($scope, $rootScope, $location) {
				$scope.skills = [
						{name: "Java", rank: "95", options:getOptions({barColor: "#2C3E50"})},
						{name: "Python", rank: "77", options:getOptions({barColor: "#2C3E50"})},
						{name: "Android SDK", rank: "83", options:getOptions({barColor: "#2C3E50"})},
						{name: "MEAN Stack", rank: "75", options:getOptions({barColor: "#2C3E50"})},
						{name: "Git", rank: "75", options:getOptions({barColor: "#2C3E50"})},
						{name: "Scala", rank: "70", options:getOptions({barColor: "#2C3E50"})},
						{name: "C#", rank: "70", options:getOptions({barColor: "#2C3E50"})},
						{name: "Racket", rank: "55", options:getOptions({barColor: "#2C3E50"})},
				];
				$scope.skills = $scope.skills.sort(function(a, b) {
					return a.rank < b.rank;
				});

				$scope.projects = [
						{name:"Form Maker", slogan:"Simple Form Maker", img:"./img/forms.png", ref:"formModal", src:"./fm/"},
						{name:"Debate Forum", slogan:"Simple Debate Forum", img:"./img/gavel.png", ref:"debateModal", src:"./debate/"}
				]

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
