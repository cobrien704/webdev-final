module.exports = function() {
    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;

    var MovieListSchema = require('./movie-list.schema.server')();
    var MovieListModel = mongoose.model('MovieListModel', MovieListSchema);

    var api = {
        createList: createList,
        getMovieListsForUser: getMovieListsForUser,
        getMovieListById: getMovieListById,
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

    function getMovieListById(listId) {
        return MovieListModel.findById({ _id: listId });
    }

    function deleteList(listId) {
        return MovieListModel.findOneAndRemove({ _id: listId });
    }


};