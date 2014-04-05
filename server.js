// require deployd
var deployd = require('deployd');

var port = process.env.PORT || 5000;

// configure database etc. 
var server = deployd({
  port: port,
  //env: 'production',
  env: 'development',
  db: {
    host: 'ds049467.mongolab.com',
    port: 49467,
    name: 'diplom-core',
    credentials: {
      username: 'abxaz92',
      password: 'chaava01'
    }
  }
});

// heroku requires these settings for sockets to work
server.sockets.manager.settings.transports = ["xhr-polling"];

// start the server
server.listen();

// debug
server.on('listening', function() {
  console.log("Server is listening on port: " + port);
});

// Deployd requires this
server.on('error', function(err) {
  console.error(err);
  process.nextTick(function() { // Give the server a chance to return an error
    process.exit();
  });
});