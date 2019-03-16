const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {
		User.findOne({ username: username }, (err, user) => {
			console.log('start')
			if (err) {
				console.log('err')
				return done(err)
			}
			if (!user) {
				console.log('no user')
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.checkPassword(password)) {
				console.log('bad pass')
				return done(null, false, { message: 'Incorrect password' })
			}
			console.log('good to go')
			return done(null, user)
		})
	}
)

module.exports = strategy
