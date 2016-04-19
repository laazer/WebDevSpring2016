(function()
{
	angular
		.module("DebateBuilderApp")
		.controller("SearchController", SearchController);

    function SearchController($rootScope, $location, DebateService) {

				$scope.searchContent = $route.current.params.content;
				$scope.debates = [];
				$scope.message = null;

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
    }
})();
