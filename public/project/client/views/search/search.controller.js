(function()
{
	angular
		.module("DebateBuilderApp")
		.controller("SearchController", searchController);

    function searchController ($rootScope, $location, $route, $scope, DebateService) {

				$scope.searchContent = $route.current.params.content;
				$scope.debates = [];
				$scope.message = null;
				$scope.selectDebate = selectDebate;
				doSeach();

				if (!$rootScope.isLoggedIn) {
						 $location.url("/");
				}

				function doSeach() {
						DebateService.findDebatesByContent($scope.searchContent).then(
							function(res) {
								var debates = res.data;
								if(debates) {
									$scope.debates = debates;
								}
								else {
									$scope.message = "Could not find any debates";
								}
							}
						);
				}

				function selectDebate(nDebate) {
						$location.url("/debate_item/" + nDebate._id);
				}
    }
})();
