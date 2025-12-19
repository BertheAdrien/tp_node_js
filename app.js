var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var http = require('http');
var { Server } = require('socket.io');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

const messages = []; 

var app = express();
const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('User connected');

  socket.emit('chatHistory', messages);

  socket.on('chatMessage', (data) => {
    messages.push({
      pseudo: data.pseudo,
      message: data.message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    io.emit('chatMessage', messages[messages.length - 1]);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'MEGASECRETDEFOULA',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

app.use(function(req, res) {
  res.status(404);
  res.render('404', { title: 'Page non trouvée' });
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('404', { title: 'Erreur' });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
