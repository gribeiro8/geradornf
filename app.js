var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var load = require('express-load');
var mongoose = require('mongoose');
var flash = require('express-flash');
var moment = require('moment');
var expressValidator = require('express-validator');
var fileUpload = require('express-fileupload');


// conexao com o mongodb teste
var desenv = 1;

if(desenv == 1){
    mongoose.connect('mongodb://localhost/nfe', function (err) {
        if(err){
            console.log("erro ao conectar no mongodb "+ err);
        }else{
            console.log("tudo certo com o banco de dados");
        }
    });
}


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', (process.env.PORT || 3002)); // teste


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({ secret: 'aquisoentrasesouber0010'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(fileUpload());




load('models').then('controllers').then('routes').into(app);

/*app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});*/

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});



// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

/*module.exports = app;*/
