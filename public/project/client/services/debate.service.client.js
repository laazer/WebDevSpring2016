(function()
{
	angular
		.module("DebateBuilderApp")
		.factory("DebateService", DebateService);

    function DebateService ($http, $q) {
				var userUrl = "/api/project/user/{0}/debate";
				var debateUrl = "/api/project/debate/{0}";
				var model = {
            createDebateForUser: createDebateForUser,
            findAllDebatesForUser: findAllDebatesForUser,
						getDebateById: getDebateById,
						getAllDebates: getAllDebates,
            deleteDebateById: deleteDebateById,
            updateDebateById: updateDebateById
        };
        return model;

				function getAllDebates() {
					var deferred = $q.defer();
					$http.get(debateUrl.format(""))
							.success(function(response){
									deferred.resolve(response);
							});

					return deferred.promise;
				}

				function getDebateById(debateId) {
					var deferred = $q.defer();
					$http.get(debateUrl.format(debateId))
							.success(function(response){
									deferred.resolve(response);
							});

					return deferred.promise;
				}

        function createDebateForUser(ownerId, debate) {
            var deferred = $q.defer();
            $http.post(userUrl.format(ownerId), debate)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

       function findAllDebatesForUser(ownerId) {
            var deferred = $q.defer();
            $http.get(userUrl.format(ownerId))
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
       }

       function deleteDebateById(debateId) {
            var deferred = $q.defer();
            $http.delete(debateUrl.format(debateId))
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
       }

       function updateDebateById(debateId, newDebate) {
            var deferred = $q.defer();
            $http.put(debateUrl.format(debateId), newDebate)
                .success(function(response) {
                    deferred.resolve(response);
                });

           return deferred.promise;
  		}

		}
})();
