module.exports= function() {
    var mongoose = require('mongoose');

    var MovieSchema = mongoose.Schema({
        title: String,
        posterURL: String
    }, {collection: 'movies'});

    return MovieSchema;
};