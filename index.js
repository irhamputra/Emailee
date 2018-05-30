const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('dotenv').config();
require('./server/models/User');
require('./server/services/passport');

const app = express();

app.use(
    cookieSession({
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days cookie
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

const MongoURI = keys.MongoUri;

if (MongoURI) {
    mongoose.connect(MongoURI);
} else {
    throw new Error('Please provide your MongoDB URI!')
}

require('./server/routers/auth')(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));