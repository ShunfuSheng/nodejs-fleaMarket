var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var login = require('./routes/login');
var users = require('./routes/users');
var index = require('./routes/index');
// var manage = require('./routes/manage');

var app = express();

// 配置模板引擎
var template = require('art-template');
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('12345'));
//session配置
app.use(session({
    secret: '12345',    //与cookieParser中的一致
    name: 'testapp',    //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    // cookie: {maxAge: 80000},   //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
}));

app.use(express.static(path.join(__dirname, 'public')));


// 引入子路由模块
app.use('/login', login);
app.use('/users', users);
app.use('/index', index);
// app.use('/admin', manage);


// 重定向路由
app.get('/', (req, res)=> {
    res.redirect('/index/');
});





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
