(function()
{
	angular
		.module("DebateApp")
		.controller("DebateController", debateController);
		
    function debateController ($rootScope, $scope, $location, DebateService) {
	   var dc = this;
       $scope.error =  null;
       $scope.message = null;
       $scope.addDebate = addDebate;
       $scope.updateDebate = updateDebate;
       $scope.deleteDebate = deleteDebate;
       $scope.selectDebate = selectDebate;
       $scope.getPCList = getPCList;
       
       if (!$rootScope.currentUser) {
            $location.url("/");
       } 
       else $scope.userId = $rootScope.currentUser._id;
        
       reloadDebates();
       
       function addDebate(debate) {
            if(!debate) {
               $scope.error = "Missing debate title.";
               return;
           }
           var cdebate = angular.copy(debate);
           DebateService.createdebateForUser($scope.userId, cdebate, function(debate) {
               reloadDebates();
           });
       }
       
       function updateDebate(debate) {
           if(!dc.selecteddebate) {
               $scope.error = "No debate seleced for editting.";
               return;
           }
           DebateService.updateDebateById(debate._id, debate, function(debate) {
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
           DebateService.deleteDebateById(debateId, function(debate) {
               reloadDebates();
           });
       }
       
       function selectDebate(index) {
           $scope.debate = $scope.debates[index];
           dc.selectedDebate = $scope.debate;
       }
       
       function reloadDebates() {
            DebateService.findAllDebatesForUser($scope.userId, function(debates) {
                $scope.debates = debates;
            });
       }
       
       function getPCList(debate) {
           var pcList = [];
           var max = Math.max(debate.pros.length, debate.cons.length);
           for(i = 0; i < max; i++) {
               var pair = [];
               if(debate.pros[i]) {
                   pair[0] = angular.copy(debate.pros[i]);
               }
               else pair[0] = false;
               if(debate.cons[i]) {
                   pair[1] = angular.copy(debate.cons[i]);
               }
               else pair[1] = false;
               pcList.push(pair);
           }
           return pcList;
       }
    }
})();