module.exports = function(app, model) {
  var request = require('request');

  var movieModel = model.movieModel;

  app.get('/api/movie/getCurrentPopularMovies', getCurrentPopularMovies);

    function getCurrentPopularMovies(req, res) {
        var requestURL = 'https://api.themoviedb.org/3/movie/popular?api_key=aefe648a02a1e5f369dce19d8429d45b&language=en-US&page=1';

        request(requestURL, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var info = JSON.parse(body)

                res.json(info);
            }
        });
    }
};