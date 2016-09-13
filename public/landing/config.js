(function()
{
	angular
		.module("JBSite")
		.config(function($routeProvider)
		{
			$routeProvider
				.when("/",
				{
					templateUrl: "views/home/home.view.html",
					controller: "HomeController",
					title: "Jacob Brandt"
				})
				
		});
})();
