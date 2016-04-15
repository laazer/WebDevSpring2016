module.exports = function(mongoose) {

    var MerritSchema = require("./merrit.schema.server.js")(mongoose);

    var ArgumentSchema = new mongoose.Schema({
      		text: String,
          ownerId: String,
          argType: { type: String, enum: ['PRO', 'CON']},
          source: {link:String, merrit:{type: [MerritSchema], default: []}},
          merrit: { type: [MerritSchema], default: []},
      	}, { collection: 'project.argument' })
  	return ArgumentSchema;
}
