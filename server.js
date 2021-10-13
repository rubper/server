const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());

const indexController = require('./controllers/index');
const apiController = require('./controllers/api');
const authController = require('./auth/auth');

app.use('/', indexController);
app.use('/auth', authController);
app.use('/api', apiController);

app.set("view engine", "ejs");
app.listen(3000)