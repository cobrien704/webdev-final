module.exports = function() {
    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;

    var MovieListSchema = require('./movie-list.schema.server')();
    var MovieListModel = mongoose.model('MovieListModel', MovieListSchema);

    var api = {
        createList: createList
    };

    return api;

    function createList(list) {
        return MovieListModel.create(list);
    }

};