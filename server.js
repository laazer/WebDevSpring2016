var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');
var uuid          = require("node-uuid");
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({ secret: process.env.PASSPORT_SECRET }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(session({
    resave: false,
    saveUninitialized: true
}));

app.use('/assignment', express.static(__dirname + '/public/assignment/client'));
app.use('/project', express.static(__dirname + '/public/project/client'));

// Routes
require('./public/assignment/server/app.js')(app, uuid);

// app.get('/hello', function(req, res){
//     res.send('hello world');
// });

app.listen(port, ipaddress, function() {
  console.log("Starting server at: " + ipaddress + " on port " + port);
});
