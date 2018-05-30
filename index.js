const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./server/services/passport');

const app = express();

require('./server/routers/auth')(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 8001;

app.get('/', (req, res, next) => {
    res.send({"hello": "World"});
    next();
});

app.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));