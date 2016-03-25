var model = require("./debate.mock.json");

module.exports = function(uuid) {
        var api = {
            createDebateForUser: createDebateForUser,
            findAllDebatesForUser: findAllDebatesForUser,
            getAllDebates: getAllDebates,
            deleteDebateById: deleteDebateById,
            updateDebateyId: updateDebateById,
            getDebateById: getDebateById,
						deleteArgumentById: deleteArgumentById,
						createArgumentForForm: createArgumentForForm,
						updateArgumentById: updateArgumentById,
        };
        return api;

        function createDebateForUser(userId, debate, callback) {
            var ldebate = debate;
            ldebate.ownerId = userId;
            ldebate.merrit = 0;
            ldebate.arguments = [];
            ldebate._id = uuid.v1();
            model.debates.push(ldebate);
            callback(ldebate);
        }

       function getDebateById(debateId) {
           var d = model.debates.find(function(item) {
               return item._id == debateId;
           });
           return d;
       }

       function findAllDebatesForUser(userId) {
           var result = model.debates.filter(function(value) {
                return value.ownerId == userId ||
                value.arguments.filter(function(arg) {
                    return pval.ownerId == userId;
                });
           });
           return result;
       }

       function getAllDebates() {
           return model.debates;
       }

       function deleteDebateById(debateId) {
            for(var f in model.debates) {
                if(model.debates[f]._id == debateId) {
                    model.debates.splice(f, 1);
                    break;
                }
            }
            model.debates;
       }

       function updateDebateById(debateId, newdebate) {
           var debate = null;
           for(var f in model.debates) {
                if(model.debates[f]._id == debateId) {
                    model.debates[f] = newdebate;
                    debate = model.debates[f];
                    break;
                }
            }
            return debate;
        }

				function createArgumentFordebate(debateId, argument) {
						var debate = finddebateById(debateId);
						var largument = argument;
						largument._id = uuid.v1();
						if(!debate.arguments) {
							debate.arguments = [];
						}
						debate.arguments.push(largument);
						updatedebateById(debateId, debate);
						return largument;
				}

				function deleteArgumentById(debateId, argumentId) {
						var debate = finddebateById(debateId);
						for(f in debate.arguments) {
							 if(debate.arguments[f]._id.toString() == argumentId) {
										 debate.arguments.splice(f, 1);
							 }
						}
						return updateDebateById(debateId, debate);
				}

				 function updateArgumentdById(debateId, argumentId, argument) {
						 deleteArgumentById(debateId, argumentId);
						 var debate = finddebateById(debateId);
						 debate.arguments.push(argument);
						 return updateDebateById(debateId, debate);
				 }


    }

})();
