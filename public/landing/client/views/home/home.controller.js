(function()
{
	angular
		.module("JBSite")
		.controller("HomeController", homeController);

    function homeController ($scope, $location, DeviceDetector, SmoothScroll, Emailer) {

				var hiddenFlag = false;
				var barShown = {
					body: "col-sm-12 col-md-9 col-lg-9 col-lg-offset-3",
					bar: "col-sm-12 col-md-3",
					button: "btn-hide col-xs-12 col-sm-12 col-md-3",
				};

				var barHidden = {
					body: "col-sm-12 col-md-12 col-lg-12",
					bar: "hidden",
					button: "btn-show col-xs-12 col-sm-12 col-md-12 col-lg-12"
				};
				$scope.contact = {};
				$scope.isBarHidden = DeviceDetector.isSmallDevice();
				$scope.setScreenSize = function() {
					if ($scope.isBarHidden) {
						 $scope.size = barHidden;
					} else {
						$scope.size = barShown;
						if(DeviceDetector.isSmallDevice()) SmoothScroll.scrollTo("side-bar");
					}
				}
				$scope.size = $scope.setScreenSize();
				$scope.hideButtonPress = function() {
					$scope.isBarHidden = !$scope.isBarHidden;
					$scope.setScreenSize();
				}

				var defaultOptions = getOptions({barColor: '#18bc9c'})
				$scope.skills = [
						{name: "Versatility", rank: "100", options:defaultOptions},
						{name: "Java", rank: "95", options:defaultOptions},
						{name: "Python", rank: "77", options:defaultOptions},
						{name: "Android SDK", rank: "83", options:defaultOptions},
						{name: "MEAN Stack", rank: "70", options:defaultOptions},
						{name: "Git", rank: "75", options:defaultOptions},
						{name: "Scala", rank: "70", options:defaultOptions},
						{name: "C#", rank: "70", options:defaultOptions},
						{name: "Racket", rank: "55", options:defaultOptions},
						{name: "Angular JS", rank: "75", options:defaultOptions},
						{name: "MongoDB", rank: "55", options:defaultOptions},
						{name: "SQL", rank: "55", options:defaultOptions},
				];

				$scope.projects = [
						{name:"Form Maker", slogan:"Simple Form Maker", img:"./img/forms.png", ref:"formModal", src:"./fm/"},
						{name:"Debate Forum", slogan:"Simple Debate Forum", img:"./img/gavel.png", ref:"debateModal", src:"./debate/"},
						{name:"Java Common Tools", slogan:"Useful Tools for Java", img:"./img/toolbox.jpg", ref:"commonsModal", src:"https://github.com/laazer/commons"},
						{name:"Portal++", slogan:"2D Portalish Game", img:"./img/portal.png", ref:"portalModal", src:"https://github.com/laazer/portalpp"},
						{name:"Scroggle", slogan:"Fun Word Game", img:"./img/scroggle.png", ref:"scroggleModal", src:"https://play.google.com/store/apps/details?id=com.laazer.scroggle"},
						{name:"Secure Chat", slogan:"Secure Chat Server and Client", img:"./img/secure-chat.png", ref:"chatModal", src:"https://github.com/blakelymadden/netsec_securechat"},
						{name:"laazer.com", slogan:"The Website That You're Currently Looking At", img:"./img/site.jpg", ref:"siteModal", src:"https://github.com/laazer/laazer_com"},
				];

				$scope.gotToPage = function(href) {
					 $location.url(href);
				}

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

				$scope.sendEmail = function(contact) {
						if(!contact.fname) {
							$scope.mailError = "Full Name field cannot be empty!";
							return;
						}
						if(!contact.email) {
							$scope.mailError = "Email field cannot be empty!";
							return;
						}
						if(!Emailer.validateEmail(contact.email)) {
							$scope.mailError = "Email is not formatted correctly!";
							return;
						}
						if(!contact.message) {
							$scope.mailError = "Message field cannot be empty!";
							return;
						}
						if(contact.message.trim().replace(' ', '').length < 400) {
							$scope.mailError = "Message is too short";
							return;
						}
						else {
							Emailer.sendEmail(contact.email, contact.fname, contact.message);
							$scope.mailError = null;
							$scope.mailMessage = "Message Sent!";
							return;
						}
				}

				function load() {
					$scope.setScreenSize();
					$scope.skills = $scope.skills.sort(function(a, b) {
						return b.rank - a.rank;
					});
				}

				return load();
    }
})();
