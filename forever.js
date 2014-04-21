var forever = require('forever');

var child = new (forever.Monitor)('server.js', {
  max: 3,
  silent: false,
  options: []
});

child.start();

forever.startServer(child);