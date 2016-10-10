(function()
{
	angular
		.module("JBSite")
		.controller("SidebarController", sideBarController);

    function sideBarController ($scope, SmoothScroll, $location) {
			var home = { ref : "home", icon : "home", title: "My Face" };
			var port = { ref : "portfolio", icon : "th", title: "Portfolio" };
			var skills = { ref : "skills", icon : "code", title: "Skills" };
			var about = { ref : "about", icon : "user", title: "About Me" };
			var contact = { ref : "contact-me", icon : "envelope", title: "Contact" };
			$scope.smoothScroll = function (eID){
	      // set the location.hash to the id of
	      // the element you wish to scroll to.
	      $location.hash(eID);

	      // call $anchorScroll()
	      SmoothScroll.scrollTo(eID);

	    };
			$scope.barItems = [home, skills, port, about, contact];
			//$anchorScroll.yOffset = 50;

	}
})();
