(function()
{
	angular
		.module("JBSite")
		.controller("SidebarController", sideBarController);
		
    function sideBarController ($scope) {
		var home = { ref : "#/", icon : "home", title: "My Face" };
		var port = { ref : "#portfolio", icon : "th", title: "Portfolio" };
		var skills = { ref : "#skills", icon : "code", title: "Skills" };
		var about = { ref : "#about", icon : "user", title: "About Me" };
		var contact = { ref : "#contact", icon : "envalope", title: "Contact" };
		
		$scope.barItems = [home, skills, port, about, contact];
	}
})();