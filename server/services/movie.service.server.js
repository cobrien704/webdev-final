module.exports = function(app, model) {
  var request = require('request');

  var movieModel = model.movieModel;
  var movieListModel = model.movieListModel;

  var baseURL = 'https://api.themoviedb.org/3';

  app.post('/api/movie/:listId', addMovieToList);
  app.get('/api/movie/getCurrentPopularMovies', getCurrentPopularMovies);
  app.get('/api/movie/search', searchMovies);


  function addMovieToList(req, res) {
      var listId = req.params['listId'];
      var movie = req.body;

      var movieToAdd = {
          'title': movie.title,
          'posterURL': 'http://image.tmdb.org/t/p/w154/' + movie.poster_path,
          'description': movie.description
      };

      if (movie) {
          movieModel
              .createMovie(listId, movieToAdd)
              .then(function (addedMovie) {
                  movieListModel
                      .getMovieListById(listId)
                      .then(function (list) {
                          list.movies.push(addedMovie._id);
                          list.save();
                          res.sendStatus(200);
                      }, function () {
                          res.sendStatus(404);
                      });
              }, function() {
                  res.sendStatus(500);
              });
      } else {
          res.sendStatus(404)
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
};