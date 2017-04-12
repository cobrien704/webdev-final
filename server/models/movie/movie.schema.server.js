module.exports= function() {
    var mongoose = require('mongoose');

    var MovieSchema = mongoose.Schema({
        title: String,
        posterURL: String,
        rating: String,
        stars: Number
    }, {collection: 'movies'});

    return MovieSchema;
};