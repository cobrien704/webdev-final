module.exports = function(app, model) {

    var userModel = model.userModel;

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.post('/api/:uid/follow/:fid', followUser);

    function createUser(req, res) {
        var user = req.body;

        userModel
            .createUser(user)
            .then(function (user) {
                console.log(user)
                if (user) {
                    res.sendStatus(201);
                } else {
                    res.sendStatus(500);
                }
            });
    }

    function findUser(req, res) {
        var id = req.query['id'];
        var email = req.query['email'];
        var query = req.query['query'];

        if (id) {
            findUserById(req, res);
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
};
