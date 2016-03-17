var express = require('express');
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


// Configuration
app.use(express.static(__dirname + '/public'));
app.use(connect.logger('dev'));
app.use(connect.json());
app.use(connect.urlencoded());
 
// Routes
 
require('./public/assingment/server/user.model.js')(app);
require('./public/assingment/server/form.model.js')(app);

app.use('/', express.static(__dirname + '/public'))

app.get('/hello', function(req, res){
    res.send('hello world');
});

app.listen(port, ipaddress);