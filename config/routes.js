var Movie = require('../app/controllers/movie');
var User = require('../app/controllers/user');
var Index = require('../app/controllers/index');
var Comment = require('../app/controllers/comment');
var Category = require('../app/controllers/category');
var Activicty=require('../app/controllers/activity');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
module.exports = function(app) {
    // 登陆验证
    app.use(function(req, res, next) {
            var _user = req.session.user;
            app.locals.user = _user
            return next()

        })
        // index page,路由
    app.get('/', Index.index);


    // user
    app.post('/user/signup', User.signup)
    app.post('/user/signin', User.signin)
    app.get('/signin', User.showSignin)
    app.get('/signup', User.showSignup)
    app.get('/logout', User.logout)
    app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list)


    // movie
    app.get('/movie/:id', Movie.detail);
    app.get('/admin/list', User.signinRequired, User.adminRequired, Movie.list);
    app.post('/admin/movie', multipartyMiddleware, User.signinRequired, User.adminRequired, Movie.savePoster, Movie.save);
    app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new);
    app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update);
    app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.delete);

    // Comment
    app.post('/user/comment', User.signinRequired, Comment.save);

    // category

    app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new)
    app.post('/admin/category', User.signinRequired, User.adminRequired, Category.save)
    app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list)
        // result

    app.get('/results', User.signinRequired, Index.search);


    app.get('/activities',Activicty.list)

}