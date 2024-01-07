const chokidar = require('chokidar');

// One-liner for current directory
chokidar.watch('./watch-folder').on('all', (event, path) => {
  console.log("New File Event: ", event, "Path: ", path);
});