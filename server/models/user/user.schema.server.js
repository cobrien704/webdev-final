module.exports= function() {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        email: String,
        movies: [{type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'}],
        dateCreated: { type: Date, default: Date.now },
        google: {
            id:    String,
            token: String
        }
    }, {collection: 'users'});

    return UserSchema;
};