module.exports = function(app) {
    var model = require('./models/models.server');

    require('./services/movie.service.server')(app, model);
};