module.exports= function() {
    var mongoose = require('mongoose');

    var MovieSchema = mongoose.Schema({
        _list: {type: mongoose.Schema.Types.ObjectId, ref:"MovieListModel", required: true},
        title: String,
        posterURL: String,
        description: String
    }, {collection: 'movies'});

    return MovieSchema;
};