module.exports = function() {
    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;

    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByEmail: findUserByEmail,
        findUsersByQuery: findUsersByQuery,
        findUserByCredentials: findUserByCredentials,
        findUserByGoogleId: findUserByGoogleId
    };

    return api;

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(id) {
        return UserModel.findById(id);
    }

    function findUserByEmail(email) {
        return UserModel.findOne({ email: email });
    }

    function findUsersByQuery(query) {
        return UserModel.find(
            {$or : [ { firstName: {"$regex": query, "$options": "i" }},
               { lastName: {"$regex": query, "$options": "i" }},
               { email: {"$regex": query, "$options": "i" }}]});

    }

    function findUserByCredentials(email, password) {
        return UserModel.findOne({ email: email, password: password });
    }

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
    }
};
