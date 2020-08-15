var createError = require('http-errors');
var express = require('express');
var path = require('path'); // 处理路劲插件
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const redisStore = require('connect-redis')(session) // session 和 redis 创立链接

const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// // 前端模版引
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev')); // 记录日志
app.use(express.json()); // 处理请求的数据
app.use(express.urlencoded({ extended: false })); // 处理请求格式、json、form-data
app.use(cookieParser()); // 解析 cookie
// app.use(express.static(path.join(__dirname, 'public'))); // 处理public静态文件

const redisCLient = require('./database/redis')
const sessionStore = new redisStore({
  client: redisCLient
})
// 设置cookie且把session存入redis
app.use(session({
  secret: 'WJios___--7852#', // 密匙
  cookie: {
    // path: '/', // 默认配置
    // httpOnly: true, // 默认配置、限制前端修改 cookie
    maxAge: 24 * 60 * 60 * 1000 // 过期时间
  },
  store: sessionStore
}))

// 注册路由
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

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
