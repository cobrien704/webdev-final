module.exports = function(app) {
    var model = require('./models/models.server');

    require('./services/user.service.server')(app, model);
    require('./services/movie.service.server')(app, model);
    require('./services/movie-list.service.server.js')(app, model);
    require('./services/activity.service.server')(app, model);
};