module.exports= function() {
    var mongoose = require('mongoose');

    var ActivitySchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref:'UserModel', required: true},
        dateCreated: { type: Date, default: Date.now },
        type: { type: String, enum: ['ADD', 'DELETE', 'CREATE', 'UPDATE', 'FOLLOW'], required: true },
        listId: { type: mongoose.Schema.Types.ObjectId, ref: 'MovieListModel'},
        movieId: Number,
        followUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
    }, {collection: 'activity'});

    return ActivitySchema;
};