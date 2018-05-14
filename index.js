const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const config = require('config-lite')(__dirname);
const routes = require('./routes');
const pkg = require('./package.json');

const app = express();

// 设置模版目录
app.set('views', path.join(__dirname, 'views'));
// 设置模版引擎为 ejs
app.set('view engine', 'ejs');

// 设置静态文件目录
app.use(session({
    name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret, // 通过 secret 计算hash 值 并放在cookie 防止篡改
    resave: true, // 强制更新session
    saveUninitialized: false, // 用户未登录 也会创建一个 session
    cookie: {
        maxAge: config.session.maxAge  // 过期时间 过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({
        url: config.mongodb // mongdb 地址
    })
}));

// flash 中间件 用来显示通知
app.use(flash());

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
    keepExtensions: true// 保留后缀
  }))

// 设置模板全局常量
app.locals.blog = {
    title: pkg.name,
    description: pkg.description
};

// 添加模板必需的三个常量
app.use(function (req, res, next) {
   res.locals.user = req.session.user;
   res.locals.success = req.flash('success').toString();
   res.locals.error = req.flash('error').toString();
   next();
});

// 路由
routes(app);

// 监听端口，启动程序
app.listen(config.port, function () {
    console.log(`${pkg.name} listening on port ${config.port}`)
});