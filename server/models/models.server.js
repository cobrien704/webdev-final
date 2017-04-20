var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/mooviews';

if (process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@" +
        process.env.MLAB_HOST + ':' +
        process.env.MLAB_PORT + '/' +
        process.env.MLAB_APP_NAME;
}

mongoose.connect(connectionString);

var userModel      = require('./user/user.model.server')();
var movieListModel = require('./movie-list/movie-list.model.server')();
var activityModel  = require('./activity/activity.model.server')();

module.exports = {
    userModel: userModel,
    movieListModel: movieListModel,
    activityModel: activityModel
};