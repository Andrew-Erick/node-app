var User = require('../models/user')


exports.showSignup = function(req, res) {
    res.render('signup', {
        title: '注册界面'
    });
}
exports.showSignin = function(req, res) {
    res.render('signin', {
        title: '登录界面'
    });
}

// signup
exports.signup = function(req, res) {
    var _user = req.body.user;
    // req.param('user')不知道是哪一个id
    // post('/user/signup:userId')
    // req.params.userId
    // post('/user/sign:1120?userid=1120')
    // req.query.userid
    User.find({
        name: _user.name
    }, function(err, user) {
        if (err) {
            console.log(err)
        }
        if (user.length > 0) {
            return res.redirect('/signin')
        } else {
            var user = new User(_user);
            user.save(function(err, user) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/');
            });
        }
    })
}


// signin
exports.signin = function(req, res) {
        var _user = req.body.user;
        var name = _user.name;
        var password = _user.password;
        User.findOne({
            name: name
        }, function(err, user) {
            if (err) {
                console.log(err)
            }

            if (!user) {
                return res.redirect('/signup');
            }
            user.comparePassword(password, function(err, isMatch) {
                if (err) {
                    return res.render('/signin');
                }
                if (isMatch) {
                    req.session.user = user;
                    return res.redirect('/');
                } else {
                    console.log('Password is not matched')
                }
            })
        })
    }
    // logout
exports.logout = function(req, res) {
    delete req.session.user
        // delete app.locals.user
    return res.redirect('/')

}

// list page
exports.list = function(req, res) {

    User.fetch(function(err, users) {
        if (err) {
            console.log(err)
        }
        res.render('userlist', {
            title: 'imooc用户列表页',
            users: users
        })
    })
}

// user middleware

exports.signinRequired = function(req, res, next) {
    var user = req.session.user
    if (!user) {
        return res.redirect("/signin");
    }
    next()
}

exports.adminRequired = function(req, res, next) {
    var user = req.session.user
    if (user.role < 10) {
        return res.redirect("/signin");
    }
    next()
}