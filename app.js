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
const redis = require('redis');
let client = redis.createClient();

var app = express();

let http = require('http').Server(app);
let io = require('socket.io')(http);
let Mood = require('./models/moods-model');
let tvShowDb = require('./models/tvshow-model');
let Message = require('./models/message-model');


mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://reeversedev:1234@ds119268.mlab.com:19268/mongochat').then(() => console.log('Connected to Database')).catch((err) => console.log(err));
// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('Connected to MongoDB.');
});

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
      description: moodMatter.description,
      mediaId: moodMatter.mediaID,
      user: moodMatter.user
    });

    mood.save((err, result) => {
      console.log('Result: ' + result);
      Mood.find({
        mediaId: moodMatter.mediaID
      }, (err, response) => {
        console.log('Response: ' + response);
        io.emit('mood', {
          type: 'new-mood',
          text: response
        });
      }).sort({
        time: -1
      });
    });
  });
  socket.on('vote', (vote) => {
    tvShowDb.update({
      id: vote.mediaId
    }, {
      $inc: {
        vote_count: 1
      }
    }, (err, res) => {
      tvShowDb.find({
        id: vote.mediaId
      }, (err, media) => {
        io.emit('vote', {
          type: 'new-vote',
          text: media
        });
      });
    });
  });
  socket.on('new-message', (message) => {
    console.log('from socket',message);
    let newMessage = new Message({
      message: message.message,
      senderName: message.sender.user.name,
      receiverName: message.receiver,
      senderEmail: message.sender.user.email,
      senderUsername: message.sender.user.username,
      senderDob: message.sender.user.dob,
      senderGender: message.sender.user.gender,
      senderProfilePicture: message.sender.user.profilePicture
    });
    newMessage.save((err, result) => {
      console.log('Saved Message', result);
      Message.find({
        _id: result._id
      }, (err, response) => {
        io.emit('message', {
          type: 'new-message',
          text: response
        });
      })
    })

  })
  socket.on('mate-request', (request) => {
    client.hset('mate-request', request.receiver, request.sender, (err, reply) => {
      if(err) {
        console.log(err);
      }
      io.emit('mate-request', {
        type: 'mate-request-sent',
        text: reply
      });
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