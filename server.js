const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8080;
const session = require('express-session')
const passport = require('./passport');
const user = require('./routes/user')
const routes = require('./routes/api')


// Sessions
app.use(
	session({
		secret: 'bongo-cat', 
		resave: false, //required
		saveUninitialized: false, //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) 
//Middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use((req, res, next) => {
	console.log('url',req.url, req.method);
	next()
})

//app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
  //res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS");  
  //next();
//});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fakereddit");

// Add routes
app.use('/user', user)
app.use('/', routes)

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
