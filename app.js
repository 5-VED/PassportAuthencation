const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/web.route');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json'),
cors=require('cors');


//Initalize express
const app = express();

//Body Parser
app.use(express.json());

// Enabled all cors request
app.use(cors());

//connecting to database
mongoose.connect('mongodb://localhost/myDataBase', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(res => console.log("Connected to Database"))
    .catch(err => console.log(err));
 


//api routes

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api',router);

app.listen(3000, () => {
    console.log('The server is up at port 3000');
});