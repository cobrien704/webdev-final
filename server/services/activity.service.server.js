module.exports = function(app, model) {

    var activityModel = model.activityModel;
    var userModel = model.userModel;

    app.post('/api/user/:userId/activity', createActivity);
    app.get('/api/user/:userId/activity', getActivityForUser);
    app.get('/api/activity/:activityId', getActivityById);

    function createActivity(req, res) {
        var userId = req.params['userId'];
        var activity = req.body;

        if (activity) {
            activityModel
                .createActivity(userId, activity)
                .then(function (addedActivity) {
                    userModel
                        .findUserById(userId)
                        .then(function (user) {
                            user.activity.unshift(addedActivity._id);

                            if (10 <= user.activity.length) {
                                user.activity.pop();
                            }
                            user.save();
                            res.sendStatus(200);
                        }, function () {
                            res.sendStatus(500);
                        })
                }, function () {
                    res.sendStatus(500);
                });
        } else {
            res.sendStatus(400);
        }
    }

    function getActivityForUser(req, res) {
        var userId = req.params['userId'];

        activityModel
            .getActivityForUser(userId)
            .then(function (activityList) {
                res.json(activityList);
            }, function () {
                res.sendStatus(500);
            });
    }

    function getActivityById(req, res) {
        var activityId = req.params['activityId'];

        activityModel
            .getActivityById(activityId)
            .then(function (activity) {
                res.json(activity);
            }, function () {
                res.sendStatus(500);
            })
    }
};
