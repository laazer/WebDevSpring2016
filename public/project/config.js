(function()
{
	angular
		.module("DebateApp")
		.config(function($routeProvider)
		{
			$routeProvider
				.when("/", 
				{
					templateUrl: "views/home/home.view.html",
					controller: "HomeController",
                    title: "Debate Home"
				})
				.when("/register", 
				{
					templateUrl: "views/users/register.view.html",
					controller: "RegisterController"
				})
                .when("/login", 
				{
					templateUrl: "views/users/login.view.html",
					controller: "LoginController"
				})
                .when("/profile", 
				{
					templateUrl: "views/users/profile.view.html",
					controller: "ProfileController"
				})
                .when("/admin", 
				{
					templateUrl: "views/admin/admin.view.html",
					controller: "AdminController"
				})
                .when("/user_debates", 
                {
                    templateUrl: "views/debates/debates.view.html",
					controller: "DebateController"   
                })
                .when("/all_debates", 
                {
                    templateUrl: "views/debates/debates.view.html",
					controller: "DebateController"   
                })
		});
})();