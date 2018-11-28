const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const userPolicies = require("./policies/User")
const index = require('./routes/index');
const user = require('./routes/user');
const Image = require('./models/Image');
const app = express();

// use it before all route definitions
app.use(cors({origin: 'http://localhost:8080'}));
mongoose.set('debug', true);
mongoose.connect("mongodb://localhost/test");
mongoose.Promise = global.Promise;
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*app.use((req, res, next) => {
  Image.remove().exec().then(() => next());
});*/
app.use('/', index);
app.use('/user', user);
app.post('/test', function (req, res, next) {
  console.log(req.body);
  if(req.body.email === 'maxy121997@mail.ru') {
    return res.status(422).send('Вы уже подписались')
  } else {
    return res.send('OK')
  }
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
