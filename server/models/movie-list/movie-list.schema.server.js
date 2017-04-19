module.exports= function() {
    var mongoose = require('mongoose');

    var MovieListSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref:'UserModel', required: true},
        title: String,
        description: String,
        movies: [{type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'}]
    }, {collection: 'movie-lists'});

    return MovieListSchema;
};