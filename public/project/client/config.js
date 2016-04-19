(function()
{
	angular
		.module("DebateBuilderApp")
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
					controller: "RegisterController",
					title: "Register"
				})
        .when("/login",
				{
					templateUrl: "views/users/login.view.html",
					controller: "LoginController",
					title: "Login"
				})
        .when("/profile",
				{
					templateUrl: "views/users/profile.view.html",
					controller: "ProfileController",
					title: "Profile"
				})
        .when("/admin",
				{
					templateUrl: "views/admin/admin.view.html",
					controller: "AdminController",
					title: "Admin"
				})
        .when("/user_debates",
        {
            templateUrl: "views/debates/debates.view.html",
						controller: "DebateController",
						title: "Debates"
        })
        .when("/all_debates",
        {
            templateUrl: "views/debates/debates.view.html",
						controller: "DebateController",
						title: "Debates"
        })
        .when("/debate_item/:debateId*",
        {
            templateUrl: "views/debates/debate_item.view.html",
						controller: "DebateController",
						title: "Debate"
        })
				.when("/debate/search/content=:content*",
				{
						templateUrl: "views/search/search.view.html",
						controller: "SearchController",
						title: "Search"
				})
		});
})();
