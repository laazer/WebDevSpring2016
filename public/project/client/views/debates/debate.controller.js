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
			 $scope.selectDebate = selectDebate;
			 $scope.addMerrit = addMerrit;
			 $scope.removeMerrit = removeMerrit;
       $scope.selectedDebate = null;
			 $scope.debateId = $route.current.params.debateId;
       setSelectedDebate($scope.debateId);
			 $scope.getPros = getPros;
			 $scope.getCons = getCons;
			 $scope.sumMerrit = sumMerrit;
			 $scope.addPro = addPro;
			 $scope.addCone = addCon;
       $scope.range = $rootScope.range;
       $scope.Math = window.Math;



			 //for debugging
			 //$scope.userId = "123";
       if (!$rootScope.currentUser) {
            $location.url("/");
       }
       else $scope.userId = $rootScope.currentUser._id;

       function reloadDebates() {
				   $scope.message = "Loading..."
           if($location.url() == "/all_debates") {
               reloadAllDebates();
           }
           if($location.url() == "/user_debates") {
               reloadUserDebates();
           }
					 else {
						  $scope.selectedDebate = getBlankDebate();
						 	setSelectedDebate($route.current.params.debateId);
					 }
					 $scope.message = null;
       }

       reloadDebates();

			 function getBlankDebate() {
				 var debate = {};
				 debate.text = "";
				 debate.merritSum = 0;
				 debate.pros = [];
				 debate.cons = [];
				 return debate;
			 }

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
           DebateService.getDebateById(dId).then(function(res) {
						  var d = res.data;
						 	initDebate(d);
							$scope.selectedDebate = d;
           });
       }

       function selectDebate(nDebate) {
           $location.url("/debate_item/" + nDebate._id);
       }

       function reloadUserDebates() {
            DebateService.findAllDebatesForUser($scope.userId).then(function(res) {
								debates = res.data;
								if(debates) {
									initAllDebates(debates);
									$scope.debates = debates;
								}
								else $scope.debates = [];
            });
       }

       function reloadAllDebates() {
            DebateService.getAllDebates().then(function(res) {
							debates = res.data;
							if(debates) {
								initAllDebates(debates);
								$scope.debates = debates;
							}
							else $scope.debates = [];
            });
       }

			 function getPros(debate) {
			 		return getArgOfType(debate, "PRO");
			 }

			 function getCons(debate) {
				 return getArgOfType(debate, "CON");
			 }

			 function getArgOfType(debate, ntype) {
				 if(!debate || !debate.darguments) return [];
				 return debate.darguments.filter(function(val) {
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
				 if(!merrit) {
					 item.merrit = [];
					 return 0;
				 }
				 return merrit.reduce(function(a, b) {
					 return a + b.value;
				 }, 0)
			 }

			 function setMerritSums(d) {
				 	d.merritSum = sumMerrit(d);
				 for(var i in d.darguments) {
					 		d.darguments[i].merritSum = sumMerrit(d.darguments[i]);
					 		d.darguments[i].source.merritSum = sumMerrit(d.darguments[i].source);
					}
		 		}

				function addMerrit(nDebate, item) {
						updateMerrit(nDebate, item, 1);
				}

				function removeMerrit(nDebate, item) {
						updateMerrit(nDebate, item, -1);
				}

				function updateMerrit(nDebate, item, value) {
						if(!item.merrit) item.merrit = [];
						var pair = item.merrit.find(function(val) {
								return (val.ownerId == $scope.userId) });
						if(!pair) {
							pair = {"ownerId": $scope.userId, "value": value};
							item.merrit.push(pair);
						}
						else if(pair.value == value) return;
						else {
							pair.value = value;
						}
						DebateService.updateDebateById(nDebate._id, nDebate).then(function(debate) {
								reloadDebates();
						});
						item.merritSum = item.merritSum + value;
				}

				function addItem(nDebate, item, ntype) {
					item.ownerId = $scope.userId;
					item.argType = ntype;
					item.source.merrit = [];
					item.merrit = [];
					item.merritSum = 0;
					item.source.merritSum = 0;
					if(ntype == "PRO") nDebate.pros.push(item);
					if(ntype == "CON") nDebate.cons.push(item);
					if(!nDebate.darguments) nDebate.darguments = [];
					nDebate.darguments.push(item);
					DebateService.updateDebateById(nDebate._id, nDebate).then(function(res) {
							reloadDebates();
					});
				}

				function addPro(nDebate, item) {
					return addItem(nDebate, item, "PRO");
					$scope.pro.text = "";
					$scope.pro.source.link = "";
				}

				function addCon(nDebate, item) {
					return addItem(nDebate, item, "CON");
					$scope.con.text = "";
					$scope.con.source.link = "";
				}

  }
})();
