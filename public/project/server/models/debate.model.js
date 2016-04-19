var q = require("q");

module.exports = function(uuid, mongoose, db) {
        var model = require("./debate.mock.json");
        var DebateSchema = require("./debate.schema.server.js")(mongoose);
        var DebateModel;
        if (mongoose.models.Debate) {
          DebateModel = mongoose.model('Debate');
        } else {
          DebateModel = mongoose.model('Debate', DebateSchema);
        }
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
            debate.ownerId = userId;
            var deferred = q.defer();
            DebateModel.create(debate, function(err, debate){
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(debate);
                }
            });
            return deferred.promise;
        }

       function findDebateById(debateId) {
           var deferred = q.defer();
           DebateModel.findOne({_id: debateId}, function(err, debate) {
               if(err) {
                   deferred.reject(err);
               } else {
                   deferred.resolve(debate);
               }
           });
           return deferred.promise;
       }

       function findAllDebatesForUser(userId) {
           var deferred = q.defer();
           DebateModel.find({ownerId : userId}, function(err, debates) {
              if(err) {
                  deferred.reject(err);
              } else {
                  deferred.resolve(debates);
              }
           });
           return deferred.promise;
       }

       function findAllDebates() {
         var deferred = q.defer();
         DebateModel.find({}, function(err, debates) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(debates);
            }
         });
         return deferred.promise;
       }

       function deleteDebateById(debateId) {
            var deferred = q.defer();
            DebateModel.remove({_id : debateId}, function(err, debate) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(debate);
                }
            });
            return deferred.promise;
       }

       function updateDebateById(debateId, newdebate) {
            var deferred = q.defer();
            newdebate.updated = Date.now();
            DebateModel.update({_id : debateId}, {$set: newdebate},
              function (err, debate) {
                if(err) {
                    deferred.reject(err);
                } else{
                    deferred.resolve(debate);
                }
            });
            return deferred.promise;
        }

				function createArgumentForDebate(debateId, argument) {
            return DebateModel.findById(debateId)
                .then(
                    function (debate) {
                        argumentId._id = uuid.v1();
                        debate.darguments.push(argument);
                        updateDebateById(debateId, debate);
                    }
                )

				}

				function deleteArgumentById(debateId, argumentId) {
            return DebateModel.findById(debateId).then(
                function(debate) {
                    debate.darguments.id(argumentId).remove();
                    return debate.save();
                }
            )
				}

				 function updateArgumentById(debateId, argumentId, argument) {
           return DebateModel.findDebateById(debateId).then(
             function(debate) {
               deleteArgumentById(argumentId).then(function(debate) {
                  createArgumentForDebate(debateId, argument);
                });
             }
           );
				 }


  }
