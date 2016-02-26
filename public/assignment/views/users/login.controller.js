(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController ($scope, UserService, $location, $rootScope) {
        var lc = this;
        $scope.login = login;
        $scope.error = null;

        function login (user) {
            UserService.findUserByUsernameAndPassword(user.username, user.password, function(user) {
                lc.user = user;
            });
            if (lc.user) {
                UserService.setCurrentUser(lc.user);
                $location.url("/profile");
            }
            else {
                $scope.error = "Incorrect username and passowrd cobmination";
            }
        }
    }
})();
