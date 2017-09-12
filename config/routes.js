var Movie = require('../app/controllers/movie');
var User = require('../app/controllers/user');
var Index = require('../app/controllers/index');
var Comment = require('../app/controllers/comment');
var Category = require('../app/controllers/category');


var Activicty=require('../app/controllers/activity');
var Stage=require('../app/controllers/stage');
var Preview=require('../app/controllers/preview');
var Project=require('../app/controllers/project');
var Pbs=require('../app/controllers/pbs');
var Wbs=require('../app/controllers/wbs');
var Obs=require('../app/controllers/obs');
var Obsuser=require('../app/controllers/obsuser');
var Projectserver=require('../app/controllers/projectserver');
var Jira=require('../app/controllers/jira');
var Jiratask=require('../app/controllers/jiratask');



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


    // // movie
    // app.get('/movie/:id', Movie.detail);
    // app.get('/admin/list', User.signinRequired, User.adminRequired, Movie.list);
    // app.post('/admin/movie', multipartyMiddleware, User.signinRequired, User.adminRequired, Movie.savePoster, Movie.save);
    // app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new);
    // app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update);
    // app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.delete);

    // // Comment
    // app.post('/user/comment', User.signinRequired, Comment.save);

    // // category

    // app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new)
    // app.post('/admin/category', User.signinRequired, User.adminRequired, Category.save)
    // app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list)
    //     // result

    // app.get('/results', User.signinRequired, Index.search);


    // activity
    app.get('/activity',Activicty.index);
    app.get('/activity/data',Activicty.list);
    app.post('/activity/edit',multipartyMiddleware,Activicty.save);
    app.delete('/activity/delete',Activicty.delete);

    // stage
    app.get('/stage',Stage.index);
    app.get('/stage/data',Stage.list);
    app.post('/stage/edit',multipartyMiddleware,Stage.save);
    app.delete('/stage/delete',Stage.delete);
    
    // preview
    app.get('/preview',Preview.index);
    app.get('/preview/data',Preview.list);
    app.post('/preview/edit',multipartyMiddleware,Preview.save);
    app.delete('/preview/delete',Preview.delete);
    app.get('/preview/detail',Preview.detail);
    
    // project
    app.get('/project',Project.index);
    app.get('/project/data',Project.list);
    app.post('/project/edit',multipartyMiddleware,Project.save);
    app.delete('/project/delete',Project.delete);
    app.get('/project/detail',Project.detail);

    // pbs
    app.get('/pbs',Pbs.index);
    app.get('/pbs/data',Pbs.list);
    app.post('/pbs/edit',multipartyMiddleware,Pbs.save);
    app.delete('/pbs/delete',Pbs.delete);
    app.get('/pbs/detail',Pbs.detail);

    // wbs
    app.get('/wbs',Wbs.index);
    app.get('/wbs/data',Wbs.list);
    app.post('/wbs/edit',multipartyMiddleware,Wbs.save);
    app.delete('/wbs/delete',Wbs.delete);
    app.get('/wbs/detail',Wbs.detail);

    // obs
    app.get('/obs',Obs.index);
    app.get('/obs/data',Obs.list);
    app.post('/obs/edit',multipartyMiddleware,Obs.save);
    app.delete('/obs/delete',Obs.delete);
    app.get('/obs/detail',Obs.detail);
    
    // stage
    app.get('/obsuser',Obsuser.index);
    app.get('/obsuser/data',Obsuser.list);
    app.post('/obsuser/edit',multipartyMiddleware,Obsuser.save);
    app.delete('/obsuser/delete',Obsuser.delete);
    app.get('/obsuser/detail',Obsuser.detail);


    app.get('/projectserver',Projectserver.index)
    app.get('/projectserver/data',Projectserver.list);
    app.post('/projectserver/edit',multipartyMiddleware,Projectserver.save);
    app.delete('/projectserver/delete',Projectserver.delete);
    app.post('/projectserver/export',Projectserver.export);

    app.get('/jira',Jira.index)
    app.get('/jiratask',Jiratask.index)

}