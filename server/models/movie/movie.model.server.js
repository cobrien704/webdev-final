module.exports = function() {
    var mongoose = require('mongoose');
    mongoose.promise = require('q').Promise;

    var MovieSchema = require('./movie.schema.server')();
    var MovieModel = mongoose.model('MovieModel', MovieSchema);

    var api = {
        createMovie: createMovie
    };

    return api;

    function createMovie(movie) {
        return MovieModel.create(movie);
    }

};