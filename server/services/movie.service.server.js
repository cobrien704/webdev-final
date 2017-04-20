module.exports = function(app, model) {
    var request = require('request');
    var movieModel = model.movieModel;
    var movieListModel = model.movieListModel;

    var baseURL = 'https://api.themoviedb.org/3';

    app.post('/api/movie/:listId', addMovieToList);
    app.delete('/api/movie/:listId', removeMovieFromList);
    app.get('/api/movie/getCurrentPopularMovies', getCurrentPopularMovies);
    app.get('/api/movie/search', searchMovies);
    app.get('/api/movie/:movieId', lookupMovieById);

    function addMovieToList(req, res) {
        var listId = req.params['listId'];
        var movie = req.body;

        if (movie) {
            movieListModel
                .getMovieListById(listId)
                .then(function (list) {
                    if (list.movies.indexOf(movie.id) !== -1) {
                        res.sendStatus(400);
                    } else {
                        list.movies.push(movie.id);
                        list.save();
                        res.sendStatus(200);
                    }

                }, function () {
                    res.sendStatus(500);
                });
        } else {
            res.sendStatus(404)
        }
    }

    function removeMovieFromList(req, res) {
        var listId = req.params['listId'];
        var movieId = req.body;

        if (movieId) {
            movieListModel
                .getMovieListById(listId)
                .then(function (list) {
                    var index = list.movies.indexOf(movieId);
                    list.movies.splice(index, 1);
                    list.save();
                    res.sendStatus(200);
                }, function() {
                    res.sendStatus(500);
                });
        } else {
            res.sendStatus(404);
        }
    }


    function createURL(apiURL, params) {
        var baseURL = 'https://api.themoviedb.org/3'

        var paramsURL = '';
        for (var key in params) {
            paramsURL += '&' + key + '=' + params[key];
        }

        return baseURL + apiURL + '?api_key=' + process.env.MOVIEDB_APIKEY + paramsURL;
      }
    function getCurrentPopularMovies(req, res) {
        var apiURL = '/movie/popular/';
        var params = {
            'language': 'en-US',
            'page': '1'
        };

        var requestURL = createURL(apiURL, params);

            request(requestURL, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var info = JSON.parse(body);

                res.json(info);
            }
        });
    }

    function searchMovies(req, res) {
        var query = req.query['query'];
        var apiURL = '/search/movie/';
        var params = {
            'query': query,
            'language': 'en-US',
            'page': 1,
            'include_adult': false
        };

        var requestURL = createURL(apiURL, params);

        request(requestURL, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var info = JSON.parse(body);

                res.json(info);
            } else {
                res.sendStatus(response.statusCode);
            }
        });
    }

    function lookupMovieById(req, res) {
        var movieId = req.params['movieId'];
        var apiURl = '/movie/' + movieId;
        var params = {
            'language': 'en-US'
        };

        var requestURL = createURL(apiURl, params);

        request(requestURL, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var info = JSON.parse(body);

                res.json(info);
            } else {
                res.sendStatus(response.statusCode);
            }
        });
    }
};