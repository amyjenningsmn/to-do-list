var router = require('express').Router();
var path = require('path');
var task = require('./task');
// [[[[[[[[[[[  Main View Route   ]]]]]]]]]]]

router.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

// [[[[[[[[[[[[[  Routes   ]]]]]]]]]]]]]

router.use('/task', task);

module.exports = router;
