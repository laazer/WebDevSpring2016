(function()
{
	angular
		.module("DebateBuilderApp")
		.factory("DebateService", DebateService);

    function DebateService ($http, $q) {
				var userUrl = "/api/assignment/owner/{0}/debate";
				var debateUrl = "/api/assignment/debate/{0}";
				var model = {
            createDebateForUser: createDebateForUser,
            findAllDebatesForUser: findAllDebatesForUser,
            deleteDebateById: deleteDebateById,
            updateDebateById: updateDebateById
        };
        return model;

        function createDebateForUser(ownerId, debate) {
            var deferred = $q.defer();
            $http.post(userUrl.debateat(ownerId), debate)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

       function findAllDebatesForUser(ownerId) {
            var deferred = $q.defer();
            $http.get(userUrl.debateat(ownerId))
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
       }

       function deleteDebateById(debateId) {
            var deferred = $q.defer();
            $http.delete(debateUrl.debateat(debateId))
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
       }

       function updateDebateById(debateId, newDebate) {
            var deferred = $q.defer();
            $http.put(debateUrl.debateat(debateId), newDebate)
                .success(function(response){
                    deferred.resolve(response);
                });

           return deferred.promise;
  		}

		}
})();
