module.exports= function() {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        movieLists: [{type: mongoose.Schema.Types.ObjectId, ref: 'MovieListModel'}],
        following: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
        dateCreated: { type: Date, default: Date.now },
        google: {
            id:    String,
            token: String
        }
    }, {collection: 'users'});

    return UserSchema;
};