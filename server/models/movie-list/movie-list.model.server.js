module.exports = function() {
    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;

    var MovieListSchema = require('./movie-list.schema.server')();
    var MovieListModel = mongoose.model('MovieListModel', MovieListSchema);

    var api = {
        createList: createList,
        getMovieListsForUser: getMovieListsForUser,
        deleteList: deleteList
    };
    return api;

    function createList(userId, list) {
        list._user = userId;
        return MovieListModel.create(list);
    }

    function getMovieListsForUser(userId) {
        return MovieListModel.find({ _user: userId });
    }

    function addMovieToList(movie, list) {

    }

    function deleteList(listId) {
        return MovieListModel.findOneAndRemove({ _id: listId });
    }


};