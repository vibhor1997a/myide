var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
app.use(session({ secret: 'ajhshYuwJKSasasAA' }));

var index = require('./routes/index');
var run = require('./routes/run');
var templates = require('./routes/templates');
var login = require('./routes/login');
var signup = require('./routes/signup');
var logout = require('./routes/logout');
var mycode =require('./routes/mycode');
var account=require('./routes/account');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/templates', templates);

app.use('/', index);
app.use('/run', run);
app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);
app.use('/mycode',mycode);
app.use('/account',account);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
