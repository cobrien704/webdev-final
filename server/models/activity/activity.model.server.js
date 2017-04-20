module.exports = function() {
    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;

    var ActivitySchema = require('./activity.schema.server')();
    var ActivityModel = mongoose.model('ActivityModel', ActivitySchema);

    var api = {
        createActivity: createActivity,
        getActivityForUser: getActivityForUser,
        getActivityById: getActivityById
    };
    return api;

    function createActivity(userId, activity) {
        activity._user = userId;
        return ActivityModel.create(activity);
    }

    function getActivityForUser(userId) {
        return ActivityModel.find({ _user: userId });
    }

    function getActivityById(activityId) {
        return ActivityModel.findById({ _id: activityId });
    }

};
