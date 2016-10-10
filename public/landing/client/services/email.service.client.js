(function()
{
	angular
		.module("JBSite")
		.factory("Emailer", emailer);


   function emailer($$http, $q) {
       var baseUrl = "/api/landing/email";
       var model = {
         sendEmail: sendEmail,
         validateEmail: validateEmail,
       };
       return model;

       function sendEmail(email, name, message) {
          var body = {
            'email': email,
            'name': name,
            'message': message
          }
          return $http.post(baseUrl, body);
       }

       function validateEmail(email) {
           var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
           return re.test(email);
       }

   }

})();
