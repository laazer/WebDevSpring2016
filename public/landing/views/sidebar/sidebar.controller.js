(function()
{
	angular
		.module("JBSite")
		.controller("SidebarController", sideBarController);

    function sideBarController ($scope, $rootScope, $anchorScroll, $location) {
			var home = { ref : "home", icon : "home", title: "My Face" };
			var port = { ref : "portfolio", icon : "th", title: "Portfolio" };
			var skills = { ref : "skills", icon : "code", title: "Skills" };
			var about = { ref : "about", icon : "user", title: "About Me" };
			var contact = { ref : "contact", icon : "envelope", title: "Contact" };

			$scope.barItems = [home, skills, port, about, contact];
			$anchorScroll.yOffset = 50;
	}
})();
