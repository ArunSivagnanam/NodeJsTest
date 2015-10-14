var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var usersAPI = require('./routes/usersAPI');
var authAPI = require('./routes/login-register');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var connectMongo = require('connect-mongo');
var MongoStore = connectMongo(session);

var app = express();

var passportConfig = require('./authentication/passport-config.js')
passportConfig();

/** VIEW ENGINE SETUP **/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/** MODULE SETUP **/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(session(
    { secret: 'ilovescotchscotchyscotchscotch',
      saveUninitialized: false,
      resave: false,
      store: new MongoStore({
        mongooseConnection: mongoose.connection
      })
    }
));
app.use(passport.initialize());
app.use(passport.session());


/** ROUTES OBJ TO USE UNDER ROUTES **/
app.use('/', index);
app.use('/usersAPI', usersAPI);
app.use('/authAPI',authAPI);


/** MIDDLEWARE FUNCTIONS FOR ERROR HANDLING **/
var pageNotFoundHandler = function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  console.log(err);
  next(err);
};

// will print stacktrace
var devErrorHandler = function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error/error', {
    message: err.message,
    error: err
  });
};

// no stacktraces leaked to user
var prodErrorHandler = function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error/error', {
    message: err.message,
    error: {}
  });
};

/** ENVIROMENT SETUP **/

if (app.get('env') === 'development') {
  app.use(pageNotFoundHandler);
  app.use(devErrorHandler);

  mongoose.connect('mongodb://localhost/planpenny');
}

if (app.get('env') === 'production') {
  app.use(pageNotFoundHandler);
  app.use(prodErrorHandler);
}

module.exports = app;
