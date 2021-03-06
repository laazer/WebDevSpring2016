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
					controller: "HomeController",
          title: "Froms Home"
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
        .when("/forms",
        {
            templateUrl: "views/forms/form.view.html",
						controller: "FormController"
        })
        .when("/forms/:formId*/fields",
        {
            templateUrl: "views/forms/form-fields.view.html",
						controller: "FormFieldsController"
        });
		});
})();
