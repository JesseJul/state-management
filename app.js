'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;


app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/setCookie/:clr', ((req, res) => {
  res.cookie('color', req.params.clr, {httpOnly: true}).send('cookie set');
}))

app.get('/deleteCookie', ((req, res) => {
  res.clearCookie('colorr');
  res.send('cookie deleted');
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
