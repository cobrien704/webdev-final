module.exports = function(app, model) {
  var request = require('request');

  var movieModel = model.movieModel;

  var baseURL = 'https://api.themoviedb.org/3'

  app.get('/api/movie/getCurrentPopularMovies', getCurrentPopularMovies);
  app.get('/api/movie/search', searchMovies);


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