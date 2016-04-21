module.exports = function(mongoose) {

    var UserSchema = new mongoose.Schema({
    		username: String,
    		password: String,
    		firstName: String,
    		lastName: String,
    		email: String,
        phones: {type: [String], default: [] }, 
    		roles: {type: [String], default: [] }
    	}, { collection: 'project.user' })
     return UserSchema;
}
