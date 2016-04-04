module.exports = function(mongoose) {

    var FieldSchema = require("./field.schema.server.js")(mongoose);

    var FormSchema = new mongoose.Schema({
    		userId: String,
    		title: { type: String, default: "New Form" },
    		fields: { type: [FieldSchema], default: [] },
    		created: { type: Date, default: Date.now() },
    		updated: { type: Date, default: Date.now() }
    	}, { collection: 'assignment.form' })
  	return FormSchema;
}
