module.exports= function() {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        accountType: { type: String, enum: ['USER', 'CHILD', 'ADMIN'], required: true },
        firstName: String,
        lastName: String,
        birthday: String,
        email: String,
        password: String,
        favGenre: String,
        movieLists: [{type: mongoose.Schema.Types.ObjectId, ref: 'MovieListModel'}],
        following: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
        activity: [{type: mongoose.Schema.Types.ObjectId, ref: 'ActivityModel'}],
        dateCreated: { type: Date, default: Date.now },
        google: {
            id:    String,
            token: String
        }
    }, {collection: 'users'});

    return UserSchema;
};