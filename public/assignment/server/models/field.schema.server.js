module.exports = function(mongoose) {

    var FieldSchema = new mongoose.Schema({
      		label: String,
      		type: { type: String, enum: ['TEXT', 'TEXTAREA', 'EMAIL', 'PASSWORD', 'RADIOS', 'CHECKBOXES', 'OPTIONS', 'DATE'] },
      		placeholder: String,
      		options: [{ label: String, value: String }]
      	}, { collection: 'assignment.field' })
  	return FieldSchema;
}
