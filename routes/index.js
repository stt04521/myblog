module.exports = function (app) {
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./siginout'));
    app.use('/posts', require('./posts'));
    app.use('/comments', require('./comments'));
    app.get('/', function (req, res) {
        res.redirect('/posts')
    });
};