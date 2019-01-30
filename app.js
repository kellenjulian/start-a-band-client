require('dotenv').config()

var express = require('express');
var app = express();
var db = require('./db');
var user = require('./controllers/usercontroller');
var post = require('./controllers/postcontroller');
var bodyParser = require('body-parser');

app.use(require("./middleware/headers"));


db.sync();
app.use(bodyParser.json());
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'))
app.use('/api/post', post);
app.listen(process.env.PORT, function() {
    console.log(`App is listening on ${process.env.PORT}`);
}) 

// ./node_modules/http-server/bin/http-server