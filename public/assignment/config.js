(function()
{
	angular
		.module("FormBuilderApp")
		.config(function($routeProvider)
		{
			$routeProvider
				.when("/", 
				{
					templateUrl: "views/home/home.view.html",
					controller: "HomeController"
				})
		});
})();