const createError = require('http-errors');
const express = require('express');
const path = require('path');
const admin = require('./src/admin');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const logger = require('morgan');
const Post = require('./models/post');


//Routing
const postsRouter = require('./routes/posts');
// const staticRouter = require('./src/admin/public/static')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './src/public')));

app.use('/', postsRouter);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
