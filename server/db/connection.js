var pg = require('pg');

var connectionString;

if (process.env.DATABASE_URL){
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/to-do-list';
}

function initializeDB(){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('Error connecting to DB!', err);
      process.exit(1);
    } else {

      var query = client.query('CREATE TABLE IF NOT EXISTS tasks(' +
      'id SERIAL PRIMARY KEY,' +
      'completed BOOLEAN NOT NULL,' +
      'task_name varchar(255) NOT NULL)');

      query.on('end', function(){
        console.log('successfully ensured tasks table exists');
        done();
      });

      query.on('error', function(){
        console.log('error creating tasks table schema!');
        process.exit(1);
      });

    }
  });
}

module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;
