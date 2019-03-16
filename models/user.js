const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({

	username: { type: String, unique: false, required: false },
	password: { type: String, unique: false, required: false }

})

// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		console.log('passwords',inputPassword, this.password)
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js no password');
		// TODO
		next();
	} else {
		console.log('models/user.js hashing');
		
		this.password = this.hashPassword(this.password);
		next();
		// bcrypt.genSalt(10, function(err, salt) {
		// 	bcrypt.hash(this.password, salt, function(err, hash) {
		// 		this.password = hash;
		// 		next();
		// 	});
		// });
		
	}
})

const User = mongoose.model('User', userSchema)
module.exports = User