var express = require('express');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var initializeDB = require('./db/connection').initializeDB;

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('server/public'));
app.use(bodyParser.json());

// [[[[[[ Route to Main Index of Routes ]]]]]]

app.use('/', index);

// [[[[[[[[[[[  Initialize Database: to-do-list ]]]]]]]]]]]

initializeDB();

// [[[[[[[[[[[[[[[  Listen ]]]]]]]]]]]]]]]]

app.listen(port, function() {
  console.log('Listening on port', port);
});
