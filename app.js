const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
//const userController = require('./Controllers/auth');
const expressValidator = require('express-validator');

//Initalize express
const app = express();

//Body Parser
app.use(express.json());





//connecting to database
mongoose.connect('mongodb://localhost/myDataBase', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(res => console.log("Connected to Database"))
    .catch(err => console.log(err));


const signup = require('./Api/register');
const login = require('./Api/login');
const update = require('./Api/update');


//api routes
app.use('/api', signup);
app.use('/api', login);
app.use('/api', update);


app.listen(3000, () => {
    console.log('The server is up at port 3000');
});