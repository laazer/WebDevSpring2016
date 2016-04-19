module.exports = function(mongoose) {

    var ArgumentSchema = require("./argument.schema.server.js")(mongoose);
    var MerritSchema = require("./merrit.schema.server.js")(mongoose);

    var DebateSchema = new mongoose.Schema({
    		ownerId: String,
    		text: String,
    		darguments: { type: [ArgumentSchema], default: [] },
        merrit: {type: [MerritSchema], default: [] },
    		created: { type: Date, default: Date.now() },
    		updated: { type: Date, default: Date.now() }
    	}, { collection: 'project.debate' })
  	return DebateSchema;
}
