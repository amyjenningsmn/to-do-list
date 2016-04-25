var router = require('express').Router();
var path = require('path');
var pg = require('pg');
var connectionString = require('../db/connection').connectionString;


router.post('/addTask', function(request, response) {
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var result = [];
      // is this an array because this will match the array we'll send in our query? Little foggy on this.
      var completed = request.body.completed;
      var task_name = request.body.task_name;

      var query = client.query('INSERT INTO tasks (completed, task_name) VAlUES ($1, $2)' +
      'RETURNING id, completed, task_name', [completed, task_name]);
      // would love a little more clarity on the array part. Not sure why this is here.

      query.on('row', function(row){
        result.push(row);
      });

      query.on('end', function() {
        done();
        response.send(result);
      });

      query.on('error', function(error) {
        console.error('Error running query:', error);
        done();
        response.status(500).send(error);
      });
    }
  })
});

router.get('/allTasks', function(request, response) {
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var query = client.query('SELECT * FROM tasks');
      var results = [];

      query.on('error', function(err){
        console.log(err);
        done();
        response.sendStatus(500);
      });

      query.on('row', function(rowData){
        results.push(rowData);
        done();
        // query.on('row'...) - does this mean on each row query, do "this", in this case push rowData to results And "rowData" is just a parameter, could be banSand to mean whatever the result of our query on each row?
      });

      query.on('end', function(){
        response.send(results);
        done();
        // and this means, when the query is finished, send the "results" array as the response from our 'get' request.
      });
    }
  });
});

router.delete('/delete/:id', function(request, response){
  var taskId = request.params.id;
  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      console.log('Delete request received');

      var query = client.query('DELETE FROM tasks WHERE id = ' + taskId);

      query.on('end', function() {
        done();
        response.send('Task has been deleted from the database');
      });

      query.on('error', function(error) {
        console.error('Error running query:', error);
        done();
        response.status(500).send(error);
      });
    }
  });
});

router.put('/finishedTask/:id', function(request, response){
  var taskId = request.params.id;
  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      console.log('Put request received');

      var query = client.query('UPDATE tasks SET completed = true WHERE id = ' + taskId);

      query.on('end', function() {
        done();
        response.send('Task has been updated on the database');
      });

      query.on('error', function(error) {
        console.error('Error running query:', error);
        done();
        response.status(500).send(error);
      });
    }
  });
});


module.exports = router;
