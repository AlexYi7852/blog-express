var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 视图
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev')); // 记录日志
app.use(express.json()); // 处理请求的数据
app.use(express.urlencoded({ extended: false })); // 处理请求格式、json、form-data
app.use(cookieParser()); // 解析 cookie
app.use(express.static(path.join(__dirname, 'public'))); // 处理public静态文件

// 注册路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 404 处理
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;