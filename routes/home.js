module.exports = function (app) {

    var home = app.controllers.home;
    //var autenticar = require('../middleware/autenticar');

    app.route('/').get(home.index);
    app.route('/tratarjson').get(home.tratarjson);


}