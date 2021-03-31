'use strict';
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const port = 3000;

// don't do this in the project

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const username = 'foo';
const password = 'bar';

app.use(cookieParser());
app.use(session({
  secret: 'jotain',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60*60*24},
}));


app.set('views', './views');
app.set('view engine', 'pug');

// don't do this in the project
app.post('/login', (req, res) => {
  const uname = req.body.username;
  const passwd = req.body.password;
  if (uname === username && passwd === password) {
    req.session.kirjautunut = true;
    res.redirect('/secret');
  } else {
    res.redirect('/form');
  }
});
// don't do this in the project
app.get('/home', (req, res) => {
  res.render('home');
});
// don't do this in the project
app.get('/form', (req, res) => {
  res.render('form');
});
// don't do this in the project
app.get('/secret', (req, res) => {
  if (req.session.kirjautunut) {
    res.render('secret');
  } else {
    res.redirect('/form')
  }
});
// don't do this in the project
app.get('/setCookie/:clr', ((req, res) => {
  res.cookie('color', req.params.clr, {httpOnly: true}).send('cookie set');
}))
// don't do this in the project
app.get('/readCookie', ((req, res) => {
  console.log('Cookies: ', req.cookies.color);
  res.send('cookie read');
}))

// don't do this in the project
app.get('/deleteCookie', ((req, res) => {
  res.clearCookie('color');
  res.send('cookie deleted');
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
