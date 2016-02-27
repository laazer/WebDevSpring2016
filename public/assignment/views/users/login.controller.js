(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController ($scope, UserService, $location, $rootScope) {
        var lc = this;
        $scope.login = login;
        $scope.error = null;

        function login (user) {
            if (!user) {
                $scope.error = "Missing username or password";
                return;
            }
            if (!user.username) {
                $scope.error = "Missing username";
                return;
            }
            if (!user.password) {
                $scope.error = "Missing password";
                return;
            }
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
