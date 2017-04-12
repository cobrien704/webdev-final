module.exports = function() {
    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;

    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByEmail: findUserByEmail
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

};