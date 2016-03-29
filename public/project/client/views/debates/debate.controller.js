(function()
{
	angular
		.module("DebateBuilderApp")
		.controller("DebateController", debateController);

    function debateController ($rootScope, $routeParams, $route, $scope, $location, DebateService) {
	   var dc = this;
       $scope.error =  null;
       $scope.message = null;
       $scope.addDebate = addDebate;
       $scope.updateDebate = updateDebate;
       $scope.deleteDebate = deleteDebate;
       $scope.selectedDebate = null;
			 $scope.debateId = $route.current.params.debateId;
       setSelectedDebate($scope.debateId);
			 $scope.getPros = getPros;
			 $scope.getCons = getCons;
			 $scope.sumMerrit = sumMerrit;
       $scope.range = $rootScope.range;
       $scope.Math = window.Math;



			 //for debugging
			 $scope.userId = "123";
      //  if (!$rootScope.currentUser) {
      //       $location.url("/");
      //  }
      //  else $scope.userId = $rootScope.currentUser._id;

       function reloadDebates() {
           if($location.url() == "/all_debates") {
               reloadAllDebates();
           }
           if($location.url() == "/user_debates") {
               reloadUserDebates();
           }
					 else {
						 	setSelectedDebate($route.current.params.debateId);
					 }
       }

       reloadDebates();

       function addDebate(nDebate) {
           if(!nDebate) {
               $scope.error = "Missing debate title.";
               return;
           }
           var cdebate = angular.copy(nDebate);
           DebateService.createDebateForUser($scope.userId, cdebate).then(function(debate) {
               reloadDebates();
           });
           $scope.in_debate.text = "";
       }

       function updateDebate(debate) {
           if(!dc.selecteddebate) {
               $scope.error = "No debate seleced for editting.";
               return;
           }
           DebateService.updateDebateById(debate._id, debate).then(function(debate) {
               reloadDebates();
           });
           dc.selectedDebate = null;
           $scope.debate = null;
           $scope.message = "debate updated successfully."
       }

       function deleteDebate(index) {
           if (dc.selectedDebate) {
               $scope.error = "debate is currently being updated.";
               return;
           }
           var debateId = $scope.debates[index]._id;
           DebateService.deleteDebateById(debateId).then(function(debate) {
               reloadDebates();
           });
       }

       function setSelectedDebate(dId) {
           DebateService.getDebateById(dId).then(function(d) {
						 	initDebate(d);
							$scope.selectedDebate = d;

           });
       }

       function selectDebate(nDebate) {
           $location.url("/debate_item/" + nDebate._id);
       }

       function reloadUserDebates() {
            DebateService.findAllDebatesForUser($scope.userId).then(function(debates) {
								initAllDebates(debates);
								$scope.debates = debates;
            });
       }

       function reloadAllDebates() {
            DebateService.getAllDebates().then(function(debates) {
								initAllDebates(debates);
                $scope.debates = debates;
            });
       }

			 function getPros(debate) {
			 		return getArgOfType(debate, "PRO");
			 }

			 function getCons(debate) {
				 return getArgOfType(debate, "CON");
			 }

			 function getArgOfType(debate, ntype) {
				 return debate.arguments.filter(function(val) {
					 	return val.argType == ntype;
				 });
			 }

			 function initAllDebates(debates) {
					 for(var d in debates) {
						 	initDebate(debates[d]);
					 }
			 }

			 function initDebate(debate) {
					 debate.pros = getPros(debate);
					 debate.cons = getCons(debate);
					 setMerritSums(debate);
			 }

			 function sumMerrit(item) {
				 if(!item) return 0;
				 var merrit = item.merrit;
				 return merrit.reduce(function(a, b) {
					 return a + b.value;
				 }, 0)
			 }

			 function setMerritSums(d) {
				 	d.merritSum = sumMerrit(d);
				 for(var i in d.arguments) {
					 		d.arguments[i].merritSum = sumMerrit(d.arguments[i]);
					 		d.arguments[i].source.merritSum = sumMerrit(d.arguments[i].source);
					}
		 		}

  }
})();
