const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require('./routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json({ limit: '10kb' }));

// Serving static file
app.use(express.static('public'));
app.use(express.static(`${__dirname}/public`));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

// Xử lý yêu cầu không hợp lệ và trả về trang 404
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

module.exports = app;
