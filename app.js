var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const authRoutes = require('./routes/auth-routes');
const profile = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

var app = express();

let http = require('http').Server(app);
let io = require('socket.io')(http);
let Mood = require('./models/moods-model');


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://reeversedev:1234@ds119268.mlab.com:19268/mongochat').then(() => console.log('Connected to Database')).catch((err) => console.log(err));


var index = require('./routes/index');
var users = require('./routes/users');



app.use(cors());

io.on('connection', (socket) => {
  console.log('User Connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('mood', (moodMatter) => {
    console.log('Mood Received: ' + JSON.stringify(moodMatter));

    let date = new Date().toLocaleDateString();

    let mood = new Mood({
      title: moodMatter.title,
      time: moodMatter.time,
      description:moodMatter.description,
      mediaId: moodMatter.mediaID
    });

    mood.save((err, result) => {
      console.log('Result: ' + result);
      Mood.find({mediaId: moodMatter.mediaID},(err, response) => {
        console.log('Response: ' + response);
        io.emit('mood', {
          type: 'new-mood',
          text: response
        });
      }).sort({time: -1});
    });
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('Connected to MongoDB.');
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/auth', authRoutes);
app.use('/users', users);
app.use('/profile', profile);

http.listen(3000, () => {
  console.log('Started on port 3000');
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;