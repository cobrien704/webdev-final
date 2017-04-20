module.exports = function(app, model) {

    var passport = require('passport');
    var bcrypt = require("bcrypt-nodejs");

    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }, localStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var userModel = model.userModel;

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.post('/api/:uid/follow/:fid', followUser);

    app.post ('/api/login', passport.authenticate('local'), login);
    app.get ('/api/loggedin', loggedin);
    app.post('/api/logout', logout);
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/'
        }), function(req, res){
            var url = '/#/user/' + req.user._id.toString() + '/activity';
            res.redirect(url);
        });

    function createUser(req, res) {
        var user = req.body;

        user.password = bcrypt.hashSync(user.password);

        userModel
            .createUser(user)
            .then(function (newUser) {
                if (newUser) {
                    res.json(newUser);
                } else {
                    res.sendStatus(500);
                }
            });
    }

    function findUser(req, res) {
        var id = req.query['id'];
        var email = req.query['email'];
        var query = req.query['query'];
        var password = req.query['password'];

        if (id) {
            findUserById(req, res);
        } else if (email && password) {
            findUserByCredentials(req, res)
        } else if (email) {
            findUserByEmail(req, res)
        } else if (query) {
            findUserByQuery(req, res);
        } else {
            res.sendStatus(500);
        }
    }

    function findUserById(req, res) {
        var id = req.query['id'];

        userModel
            .findUserById(id)
            .then(function(user) {
                if (user) {
                    res.send(user);
                } else {
                    res.sendStatus(404);
                }
            });
    }

    function findUserByEmail(req, res) {
        var email = req.query['email'];

        userModel
            .findUserByEmail(email)
            .then(function(user) {
                if (user) {
                    res.send(user);
                } else {
                    res.sendStatus(404);
                }
            });
    }

    function findUserByQuery(req, res) {
        var query = req.query['query'];

        userModel
            .findUsersByQuery(query)
            .then(function (results){
                if (results.length !== 0) {
                    res.json(results);
                } else {
                    res.sendStatus(404);
                }
            });
    }

    function findUserByCredentials(req, res) {
        var email = req.query['email'];
        var password = req.query['password'];

        userModel
            .findUserByCredentials(email, password)
            .then(function(user) {
                res.json(user);
            },function() {
                res.sendStatus(500);
            });
    }

    function followUser(req, res) {
        var userId = req.params['uid'];
        var followUserId = req.params['fid'];

        if (followUserId) {
            userModel
                .findUserById(userId)
                .then(function (user) {
                    if (user.following.indexOf(followUserId) !== -1) {
                        res.sendStatus(400);
                    } else {
                        user.following.push(followUserId);
                        user.save();
                        res.sendStatus(200);
                    }
                }, function () {
                    res.sendStatus(500);
                });
        } else {
            res.sendStatus(404);
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByEmail(username)
            .then(
                function(user) {
                    if(user.email === username && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            birthday:  '',
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel
                            .createUser(newGoogleUser)
                            .then(function (user) {
                                return done(null, user);
                            });
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                });
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }
};
