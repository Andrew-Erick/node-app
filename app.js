var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session) //mongodb进行会话
var logger = require('morgan');
var multiparty = require('connect-multiparty');
mongoose.Promise = Promise;

var port = process.env.PORT || 3000;
var app = express();
var dbUrl = 'mongodb://localhost/imooc';
mongoose.connect(dbUrl);


var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
//记住会话状态，最新的版本已经不需要依赖cookie-parser
// var cookieParser=require('cookie-parser');


app.set('views', './app/views/pages'); //视图
app.set('view engine', 'jade'); //默认的模板引擎
app.use(bodyParser()); //表单数据的序列化
app.use(serveStatic('public')); //路径
app.use(multiparty()) //引入中间件
    /**
     *name: 设置 cookie 中保存 session id 的字段名称，默认为connect.sidsecret: 
     *通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改 
     *resave: 如果为true，则每次请求都重新设置sessio的 cookie，假设你的cookie是10分钟过期，每次请求都会再设置10分钟
     *saveUninitialized: 如果为true, 则无论有没有session的cookie，每次请求都设置个session cookie
     *利用express-session操作，可以在本地保存当前的信息
     * [secret description]
     * @type {[type]}
     */
    /*app.use(session({secret: 'imooc',resave: true,saveUninitialized: true})) /*/
app.use(session({
    secret: 'imooc',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    }),
    resave: false,
    saveUninitialized: true
}))

if ('development' === app.get('env')) {
    app.set('showStackError', true);
    // logger 需要安装morgan
    app.use(logger(':method :url :status'))
    app.locals.pretty = true
    mongoose.set('debug', true)
}

require('./config/routes')(app)


app.locals.moment = require('moment');
app.listen(port); //监听端口
console.log('imooc started on port' + port);