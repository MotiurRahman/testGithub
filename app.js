var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var routes = require('./routes/index');
var users = require('./routes/users');
var todos = require('./routes/todos');
var move = require('mv');
var upload = multer({
  dest: '/tmp'
})

//var uploads = require('./routes/uploads');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/todos', todos.list);
app.post('/todos', todos.addToList);

app.use('/', routes);
app.use('/users', users);
//app.use('/uploads', uploads);

//app.put('/api/todos', todos.update);
//app.delete('/api/todos', todos.delete);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));



app.post('/uploads', upload.array('images'), function(req, res) {
  var files = req.files;
  console.log(files);
  files.forEach(function(file) {
    var source = file.path;
    var dest = './uploads';
    var fileName = file.originalname;
    move(source, dest + '/' + fileName, function(err) {
      if (err) {
        throw err;
      }
      console.log(fileName + ' is uploaded successfully');
    });
  });
  res.status(204).end('uploaded successfully');
});





app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
