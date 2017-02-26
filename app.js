/* --------------- Imports block --------------- */
// express - framework for creating my API
var express = require('express');
// path stands for managing relative path
var path = require('path');
// image near title
var favicon = require('serve-favicon');
// logs, it generates LOGS in console
var logger = require('morgan');
// make access to parameters in cookies
var cookieParser = require('cookie-parser');
// make access to request parameters
var bodyParser = require('body-parser');
// load mongoose package
var mongoose = require('mongoose');
/* --------------- /Imports block --------------- */


/* --- Getting routes from different folder --- */
var index = require('./routes/index');
var users = require('./routes/users');
/* --- /Getting routes from different folder --- */


/* ------- Creating express application ------- */
var app = express();
/* ------- /Creating express application ------- */


/* ---------- Connection to mongodb block ---------- */
// Use native Node promises for mongoose
mongoose.Promise = global.Promise;
// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
/* ---------- /Connection to mongodb block ---------- */


/* ---- Views block and using ejs template engine ---- */
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/* ---- /Views block and using ejs template engine ---- */


/* --------------- Middlewares --------------- */
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/* --------------- /Middlewares --------------- */


/* ----- Using routes in another folder ----- */
app.use('/', index);
app.use('/users', users);
/* ----- /Using routes in another folder ----- */


/* ----------- Managing 404 error ----------- */
// Here we see 3 params, so this middleware won't remake error requests
// It works only if there are no error and all previous routes was checked
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
/* ----------- /Managing 404 error ----------- */


/* ------------------------ Error handler ------------------------ */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // return json, not html
  res.json({error: err.status, title: err.message});
});
/* ------------------------ /Error handler ------------------------ */


module.exports = app;
