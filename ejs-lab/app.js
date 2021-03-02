var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// task 3 variables
let x = 5;
let myFavouriteFruit = "kiwi";

// task 4 variables
let viewCount = 0;

// task 7 variables
let shapes = [
  {id:'001', name:'circle', image: 'data:image/png;base64,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'},
  {id:'002', name:'triange', image:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Green_equilateral_triangle_point_up.svg/1200px-Green_equilateral_triangle_point_up.svg.png'},
  {id:'003', name:'squares', image:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/1200px-Square_-_black_simple.svg.png'},
];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/boring', function(req, res) {
  res.send('This is a boring line of text');
});

app.get('/exciting', function(req, res) {
  res.render('exciting.ejs');
});

// task 3
app.get('/dynamic_template_practice', function(req, res) {
  res.render('test', {x: x, favFruit: myFavouriteFruit, name: "alex"});
});

// task 4
app.get('/really_exciting', function(req, res) {
  viewCount++;
  res.render('really_exciting', {viewCount: viewCount});
});

// task 7
app.get('/display_my_array', function(req, res) {
  res.render('display_my_array', {shapes: shapes});
})

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

app.listen(3000, function() {
  console.log('listening on port 3000');
})

module.exports = app;
