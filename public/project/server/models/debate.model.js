module.exports = function(uuid) {
        var model = require("./debate.mock.json");
        var api = {
            createDebateForUser: createDebateForUser,
            findAllDebatesForUser: findAllDebatesForUser,
            findAllDebates: findAllDebates,
            deleteDebateById: deleteDebateById,
            updateDebateById: updateDebateById,
            findDebateById: findDebateById,
						deleteArgumentById: deleteArgumentById,
						createArgumentForDebate: createArgumentForDebate,
						updateArgumentById: updateArgumentById,
        };
        return api;

        function createDebateForUser(userId, debate) {
            var ldebate = debate;
            ldebate.ownerId = userId;
            ldebate.merrit = [];
            ldebate.arguments = [];
            ldebate._id = uuid.v1();
            model.debates.push(ldebate);
            return ldebate;
        }

       function findDebateById(debateId) {
         for(var i in model.debates) {
           if(model.debates[i]._id == debateId) {
             return model.debates[i];
           }
           return null;
         }
           var d = model.debates.find(function(item) {
               return item._id == debateId;
           });
           return d;
       }

       function findAllDebatesForUser(userId) {
           var result = model.debates.filter(function(value) {
                return value.ownerId == userId ||
                value.arguments.filter(function(arg) {
                    return arg.ownerId == userId;
                });
           });
           return result;
       }

       function findAllDebates() {
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

				function createArgumentForDebate(debateId, argument) {
						var debate = finddebateById(debateId);
						var largument = argument;
						largument._id = uuid.v1();
						if(!debate.arguments) {
							debate.arguments = [];
						}
            largument.merrit = [];
            largument.source.merrit = [];
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

				 function updateArgumentById(debateId, argumentId, argument) {
						 deleteArgumentById(debateId, argumentId);
						 var debate = finddebateById(debateId);
						 debate.arguments.push(argument);
						 return updateDebateById(debateId, debate);
				 }


  }
