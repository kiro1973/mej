if(process.env.NODE_ENV !=="production"){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUI = require("swagger-ui-express");


const YAML = require("yamljs");
const swaggerJSDocs = YAML.load("./api.yaml");

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));





//Import Routes
const authRoute = require('./routes/auth');

dotenv.config();

// connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('connected to db')
);

//Middlewares
app.use(express.json());

//Route MiddleWare


/**
 * @swagger
 * /register:
 * post:
 * description:Used to register new customer
 * responses:
 * '200':
 * description:user registered succesfully
 * 
 */




app.use('/api/user', authRoute)
const port=process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on Port ${port}`)
})