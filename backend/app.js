const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
require('./config/passport-setup');

// Set up CORS
app.use(cors());

// Set up the LOGGING and PARSING
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Set up session
app.use(session({
    secret: 'thisisthesecret',
    resave: false,
    saveUninitialized: false,
}));

// Set up Passport.js
app.use(passport.initialize());
app.use(passport.session());

//HEADERS
//Append headers to any response we send back.  Should be done before routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', true)
    //Browser checks if you are allowed to make a specific request
    if(req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
    }
    next();
});

// Importing Routers from API
const homeRouter = require('./api/home');
const productsRouter = require('./api/products');
const signupRouter = require('./api/signup');
const usersRouter = require('./api/users');
const loginRouter = require('./api/login');
const profileRouter = require('./api/profile');
const logoutRouter = require('./api/logout');

// Mounting the Routers
app.use('/', homeRouter);
app.use('/products', productsRouter);
app.use('/signup', signupRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);
app.use('/logout', logoutRouter);


//ERROR HANDLING
//Can handle errors by catching all requests passing the 2 middlewares
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

//Should handle errors thrown from anywhere else in the application
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;