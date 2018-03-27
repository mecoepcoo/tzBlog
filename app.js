var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// nginx反向代理时获取正确的客户端ip
app.set('trust proxy', 'loopback');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/users', users);

// 处理跨域
var ALLOWED_ORIGIN = [
  'http://localhost:4200',
  'http://localhost:4300',
];

function isOriginAllowed(reqOrigin, allowedOrigin) {
  for (var i = 0, len = allowedOrigin.length; i < len; i++) {
    if (allowedOrigin[i] === reqOrigin) {
      return true;
    }
  }
  return false;
}

app.all('*', function(req, res, next) {
  var reqOrigin = req.headers.origin;
  if (isOriginAllowed(reqOrigin, ALLOWED_ORIGIN)) {
    res.header('Access-Control-Allow-Origin', reqOrigin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With, X-Access-Token, X-Real-IP');
  res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(session({
  name: 'blog',
  secret: 'helloworld',
  resave: true,
  saveUninitialized: true,
  captcha: '',
}));

// api
app.use('/api/admin', require('./api/admin/login'));
app.use('/api/admin', require('./api/admin/admin-user'));
app.use('/api/admin', require('./api/admin/admin-group'));
app.use('/api/admin', require('./api/admin/blogroll'));
app.use('/api/admin', require('./api/admin/category'));
app.use('/api/admin', require('./api/admin/tag'));
app.use('/api/admin', require('./api/admin/post'));

app.use('/api/home', require('./api/home/category'));
app.use('/api/home', require('./api/home/post'));
app.use('/api/home', require('./api/home/tag'));
app.use('/api/home', require('./api/home/blogroll'));
app.use('/api/home', require('./api/home/statistic'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('404');
  // next(err);
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
