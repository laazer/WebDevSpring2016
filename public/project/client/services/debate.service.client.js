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
            updateDebateById: updateDebateById,
						findDebatesByContent: findDebatesByContent
        };
        return model;

				function getAllDebates() {
					return $http.get(debateUrl.format(""));
				}

				function getDebateById(debateId) {
					return $http.get(debateUrl.format(debateId));
				}

        function createDebateForUser(ownerId, debate) {
					return $http.post(userUrl.format(ownerId), debate);
        }

       function findAllDebatesForUser(ownerId) {
          return $http.get(userUrl.format(ownerId));
       }

       function deleteDebateById(debateId) {
				  return $http.delete(debateUrl.format(debateId));
       }

       function updateDebateById(debateId, newDebate) {
           return $http.put(debateUrl.format(debateId), newDebate);
  		}

			function findDebatesByContent(content) {
				  var search = "search/" + content;
					var url = debateUrl.format(search);
					return $http.get(url);
			}

		}
})();
