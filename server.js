var express = require('express');
var uuid = require('node-uuid');
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.uuid = uuid;
// Configuration
app.use(express.static(__dirname + '/public'));
 
// Routes
 
require('./public/assignment/server/models/user.model.js')(app);
//require('./public/assignment/server/models/form.model.js')(app);

app.use('/', express.static(__dirname + '/public'))

app.get('/hello', function(req, res){
    res.send('hello world');
});

app.listen(port, ipaddress);