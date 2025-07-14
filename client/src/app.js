var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const discoverRoutes = require('./routes/discoverRoutes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/discover', discoverRoutes);

app.use('/', indexRouter);
app.use('/users', usersRouter);

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


import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import PostFeed from './components/PostFeed';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainNav from './components/MainNav';
import WelcomePage from './pages/WelcomePage';
import AboutPage from './pages/AboutPage';
import MembershipPage from './pages/MembershipPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <MainNav/>
      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/memberships" element={<Memberships/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
      </Routes>
      </Router>
  );
}

export default App;


