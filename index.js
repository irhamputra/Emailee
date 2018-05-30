const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get('/', (req, res, next) => {
    res.send({ "hello": "World" });
    next();
});

app.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));