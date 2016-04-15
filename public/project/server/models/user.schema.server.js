module.exports = function(mongoose) {

    var UserSchema = new mongoose.Schema({
    		username: String,
    		password: String,
    		firstName: String,
    		lastName: String,
    		email: String,
    		phones: [String]
    	}, { collection: 'project.user' })
     return UserSchema;
}
