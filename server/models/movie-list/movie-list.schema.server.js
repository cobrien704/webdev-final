module.exports= function() {
    var mongoose = require('mongoose');

    var MovieListSchema = mongoose.Schema({
        title: String,
        description: String,
        movies: [{type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'}]
    }, {collection: 'movie-lists'});

    return MovieListSchema;
};