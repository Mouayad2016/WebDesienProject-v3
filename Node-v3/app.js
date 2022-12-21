var express = require('express');
var app = express();
const cors = require('cors');
const dotenv = require('dotenv');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/crud');
const itemRouter = require('./routes/itemCrud')
const auctionRoute = require('./routes/auction')
const bidRoute = require('./routes/bids')
const testRout= require('./routes/user')

dotenv.config();


// sequelize.sync({
//     force: true
// }).then(() => ass);



// app.use(logger('dev'));
var bodyParser = require('body-parser');
app.use(express.json());



// for parsing application/
// // app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use(express.json());


app.use(cors());
app.use('/user', usersRouter);
app.use('/auth', authRouter)
app.use('/bid', bidRoute);
app.use('/item', itemRouter)
app.use('/auction', auctionRoute)
app.use('/u',testRout)
module.exports = app;