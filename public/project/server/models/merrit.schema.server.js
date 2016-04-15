module.exports = function(mongoose) {

    var MerritSchema = new mongoose.Schema({
      user: String,
      value: {type: Number, max: 1, min: -1, default: 0}
    }, { collection: 'project.merrit' })
  	return MerritSchema;
}
