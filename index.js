const chokidar = require('chokidar'),
  { exec } = require('child_process'),
  express = require('express'),
  app = express();

// Do initial compile
console.log('Setting up...');
exec('npx babel main --out-dir dev');
console.log('Setting up complete. Starting server');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/dev/:path', (req, res) => {
  res.sendFile(__dirname + '/dev/' + req.params.path);
});

app.get('/lib/:path', (req, res) => {
  res.sendFile(__dirname + '/lib/' + req.params.path);
});
app.listen(8080, () => console.log('Server running.'));

// Watch for file changes
chokidar.watch('./main').on('change', (path) => {
  setTimeout(() => {
    var p = path.replace('main', '');
    console.log('Update ' + p);
    console.log(`npx babel main${p} -o dev${p}`);
    exec(`npx babel main${p} -o dev${p}`);
  }, 1000);
});
