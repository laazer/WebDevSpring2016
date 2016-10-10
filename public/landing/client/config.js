(function()
{
	angular
		.module("JBSite")
		.config(function($routeProvider, $locationProvider)
		{
			$routeProvider
				.when("/",
				{
					templateUrl: "views/home/home.view.html",
					controller: "HomeController",
					title: "Jacob Brandt"
				})
				//add more urls here
				//.otherwise({redirectTo: "/"});

				// if(window.history && window.history.pushState) {
				// 	$locationProvider.html5Mode({
				// 		 enabled: true,
				// 		 requireBase: false
				// 	});
				// }
		});
})();
