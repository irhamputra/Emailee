const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const PORT = 8001 || process.env.PORT;

app.get('/', (req, res, next) => {
    res.send({ "hello": "World" });
    next();
});

app.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));