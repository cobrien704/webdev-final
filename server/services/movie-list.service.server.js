module.exports = function(app, model) {
    var request = require('request');

    var movieListModel = model.movieListModel;
    var userModel = model.userModel;

    app.post('/api/user/:userId/movieList', createList);
    app.get('/api/movieList/:listId', getMovieListById);
    app.get('/api/user/:userId/movieList', getMovieListsForUser);
    app.delete('/api/movieList/:listId', deleteList);


    function createList(req, res) {
        var userId = req.params['userId'];
        var list = req.body;

        if (list) {
            movieListModel
                .createList(userId, list)
                .then(function (addedList) {
                    userModel
                        .findUserById(userId)
                        .then(function (user) {
                            user.movieLists.push(addedList._id);
                            user.save();
                            res.sendStatus(200);
                        }, function () {
                            res.sendStatus(500);
                        });
                }, function () {
                    res.sendStatus(500);
                });
        } else {
            res.sendStatus(400);
        }
    }

    function getMovieListById (req, res) {
        var listId = req.params['listId'];

        movieListModel
            .getMovieListById(listId)
            .then(function (list) {
                if (list) {
                    res.json(list);
                } else {
                    res.sendStatus(404);
                }
            }, function () {
                res.sendStatus(500);
            });
    }

    function getMovieListsForUser (req, res) {
        var userId = req.params['userId'];

        movieListModel
            .getMovieListsForUser(userId)
            .then(function (lists) {
                res.json(lists);
            }, function () {
                res.sendStatus(500);
            });
    }

    function deleteList(req, res) {
        var listId = req.params['listId'];

        movieListModel
            .deleteList(listId)
            .then(function (list) {
                var userId = list._user;

                userModel
                    .findUserById(userId)
                    .then(function (user) {
                        var index = user.movieLists.indexOf(list._id);
                        user.movieLists.splice(index, 1);
                        user.save();
                        res.sendStatus(200);
                    }, function () {
                        res.sendStatus(500);
                    });
            }, function () {
                res.sendStatus(404);
            });
    }
};