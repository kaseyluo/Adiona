var express = require('express');
var stormpath = require('express-stormpath');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public

 
// app.on('stormpath.ready', function () {
//   console.log('Stormpath Ready');
// });
 
// app.listen(3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(stormpath.init(app, {
  client: {
    apiKey: {
      id: '1CY1WC7Z3NTQNELBYC8568VI4',
      secret: 'BAfuL35LnjTD4kZtCHWJiRodTz9KIgzKa+9Rouuj47o',
    }
  },
  application: {
    href: 'https://api.stormpath.com/v1/applications/4ISnjB6WwfJr3riHrMOLv'
  }
}));
 
app.on('stormpath.ready', function () {
  console.log('Stormpath Ready');
});

// app.use(stormpath.init(app, {
//   apiKeyFile: process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + '/.stormpath/apiKey.properties',
//   secretKey: 'BAfuL35LnjTD4kZtCHWJiRodTz9KIgzKa+9Rouuj47o',
//   application: 'https://api.stormpath.com/v1/applications/4ISnjB6WwfJr3riHrMOLv',
// }));

// app.get('/', function(req, res) {
//   res.send('home page!');
// });

// app.get('/secret', function(req, res) {
//   res.send('secret page!');
// });

app.listen(4000);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
