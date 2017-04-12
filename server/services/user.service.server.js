module.exports = function(app, model) {

    var userModel = model.userModel;

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);

    function createUser(req, res) {
        var user = req.body;

        userModel
            .createUser(user)
            .then(function (user) {
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

        if (id) {
            findUserById(req, res);
        } else if (email) {
            findUserByEmail(req, res)
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
};