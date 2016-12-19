var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authService = require('./services/authenticatorService');

mongoose.connect("localhost:27017/votastic");

var index = require('./routes/index');
var users = require('./routes/users');
var apiRegister = require('./routes/api/user/register');
var apiMyPolls = require('./routes/api/my/polls');
var apiMyPages = require('./routes/api/my/pages');
var apiMyFollows = require('./routes/api/my/follows');
var apiMyProfile = require('./routes/api/my/profile');
var apiPollsRandom = require('./routes/api/polls/random');
var apiPollsFind = require('./routes/api/polls/find');
var apiPollsNews = require('./routes/api/polls/news');
var apiPollsPageId = require('./routes/api/polls/pageid');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(authService);

app.use('/', index);
app.use('/users', users);
app.use('/api/user/register', apiRegister);
app.use('/api/my/polls', apiMyPolls);
app.use('/api/my/pages', apiMyPages);
app.use('/api/my/follows', apiMyFollows);
app.use('/api/my/profile', apiMyProfile);
app.use('/api/polls/random', apiPollsRandom);
app.use('/api/polls/find', apiPollsFind);
app.use('/api/polls/news', apiPollsNews);
app.use('/api/polls/pageid', apiPollsPageId);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
