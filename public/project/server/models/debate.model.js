(function()
{
	angular
		.module("DebateApp")
		.factory("DebateService", DebateService);
		
    function DebateService () {
        var model = {
            debates : [
                    {"_id": 100, "ownerId": 123, "text": "Web Dev is the best class!", "merrit": 5,
                        "pros": [ 
                            {"text": "The proffesor is awesome", "merrit": 100, "source": {"link": "www.foo.com", "merrit": 21}, "ownerId": 456},
                            {"text": "So many reasons", "merrit": 36, "source":{"link": "www.stackoverflow.com", "merrit": 99}, "ownerId": 345},
                            {"text": "DAT MEAN STACK", "merrit": 7, "source": {"link": "www.bar.com", "merrit": 99}, "ownerId": 234}
                        ],
                        "cons": [
                            {"text": "It's a lot of work", "merrit": 100, "source": {"link": "www.baz.com", "merrit": 99}, "ownerId": 234}
                        ],
                    },
                    {"_id": 101, "ownerId": 345, "text": "Beer is good...", "merrit": 12,
                        "pros": [ 
                            {"text": "College students are smart and they drink beer", "merrit": 100, "source": {"link": "www.foo.com", "merrit": 21}, "ownerId": 456},
                            {"text": "Its basic logic", "merrit": 36, "source":{"link": "www.stackoverflow.com", "merrit": 99}, "ownerId": 345}
                        ],
                        "cons": [
                            {"text": "My liver disagrees", "merrit": 100, "source": {"link": "www.baz.com", "merrit": 99}, "ownerId": 234},
                           {"text": "My phone disagrees", "merrit": 7, "source": {"link": "www.bar.com", "merrit": 99}, "ownerId": 234}
                        ],
                    },
                    {"_id": 102, "ownerId": 456, "text": "Shrek is love", "merrit": 42,
                        "pros": [ 
                            {"text": "Shrek is life", "merrit": 100, "source": {"link": "www.foo.com", "merrit": 21}, "ownerId": 456}
                        ],
                        "cons": [
                            {"text": "Shrek is a social construct", "merrit": 68, "source": {"link": "www.baz.com", "merrit": 99}, "ownerId": 234},
                            {"text": "So many reasons", "merrit": 36, "source":{"link": "www.stackoverflow.com", "merrit": 99}, "ownerId": 345},
                            {"text": "Who is this stupid?", "merrit": 7, "source": {"link": "www.bar.com", "merrit": 99}, "ownerId": 123}
                        ],
                    }
                    ],

            createDebateForUser: createDebateForUser,
            findAllDebatesForUser: findAllDebatesForUser,
            getAllDebates: getAllDebates,
            deleteDebateById: deleteDebateById,
            updateDebateyId: updateDebateById,
            getDebateById: getDebateById
            
        };
        return model;
        
        function createDebateForUser(userId, debate, callback) {
            var ldebate = debate;
            ldebate.ownerId = userId;
            ldebate.merrit = 0;
            ldebate.pros = [];
            ldebate.cons = [];
            ldebate._id = (new Date).getTime();
            model.debates.push(ldebate);
            callback(ldebate);
        }
    
       function getDebateById(debateId, callback) {
           var d = model.debates.find(function(item) {
               return item._id == debateId;
           });
           callback(d);
       }
       
       function findAllDebatesForUser(userId, callback) {
           var result = model.debates.filter(function(value) {
                return value.ownerId == userId || 
                value.pros.filter(function(pval) {
                    return pval.ownerId == userId;
                }).length > 0 || value.cons.filter(function(cval) {
                    return cval.ownerId == userId;
                }).length > 0;    
           });
           callback(result);
       }
        
       function getAllDebates(callback) {
           callback(model.debates);
       }
       
       function deleteDebateById(debateId, callback) {
            for(var f in model.debates) {
                if(model.debates[f]._id == debateId) {
                    model.debates.splice(f, 1);
                    break;
                }
            }
            callback(model.debates);    
       }
       
       function updateDebateById(debateId, newdebate, callback) {
           var debate = null;
           for(var f in model.debates) {
                if(model.debates[f]._id == debateId) {
                    model.debates[f] = newdebate;
                    debate = model.debates[f];
                    break;
                }
            }
            callback(debate);   
        }
    }
    
})();