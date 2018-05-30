const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config();

const app = express();

passport.use(new GoogleStrategy());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get('/', (req, res, next) => {
    res.send({ "hello": "World" });
    next();
});

app.use("/auth/google", (req, res, next) => {

});

app.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));