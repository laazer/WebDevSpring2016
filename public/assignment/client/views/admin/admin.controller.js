
(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, $scope, $location, UserService) {
        var selectedUserId = null;

        $scope.users = null;
        $scope.ntype = '';
        $scope.username = "";
        $scope.firstName = "";
        $scope.lastName = "";
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.selectUser = selectUser;
        $scope.deleteUser = deleteUser;
        $scope.error = "";
        $scope.message = "";
        $scope.user = null;

        if(!$rootScope.isAdmin) {
          $location.url("/");
        }

        function reloadAdmin() {
            UserService.findAllUsers()
                .then(function(response) {
                    var users = response.data;
                    if (users) {
                        for(i in users) {
                          if(!users[i].phones) users[i].sroles = "";
                          else users[i].sroles = users[i].phones.toString();
                        }
                        $scope.users = users;
                    }
                    $scope.user = null;
                }, function(err) { console.log(err); });
        }
       reloadAdmin();

        function addUser(user) {
            if(!user) {
              $scope.error = "no user selected to add";
            }
            user.email = "";
            user.phones = user.sroles.split(',');
            UserService
                .createUser(user)
                .then(function(response) {
                    var newUser = response.data;
                    if (newUser) {
                        reloadAdmin()
                    }
                }, function(err) {console.log(err);});
        }

        function updateUser(user) {
            if(!user) {
              $scope.warning = "no user selected to edit";
            }
            user.phones = user.sroles.split(',');
            if (selectedUserId) {
                UserService
                    .updateUser(selectedUserId, user)
                    .then(function(response) {
                        var user = response.data;
                        if (user) {
                            return reloadAdmin();
                        }
                    });
            }
        }

        function selectUser(user) {
            // find user id from $scope.users
            var index = null;
            for (var u in $scope.users) {
                if ($scope.users[u].username == user.username) {
                    index = u;
                }
            }
            selectedUserId = $scope.users[index]._id;

            UserService
                .findUserById(selectedUserId)
                .then(function(response) {
                    var user = response.data;
                    user.password = null;
                    $scope.user = user;
                });
        }

        function deleteUser(user) {
            // find user id from $scope.users
            if(user.username == UserService.getCurrentUser().username) {
              $scope.error = "cannot delete admin";
              return;
            }
            var index = null;
            for (var u in $scope.users) {
                if ($scope.users[u].username == user.username) {
                    index = u;
                }
            }
            selectedUserId = $scope.users[index]._id;

            UserService
                .deleteUserById(selectedUserId)
                .then(function() {
                    return UserService.findAllUsers()
                    .then(function(response) {
                        reloadAdmin()
                    });
                });
        }

    }
})();
