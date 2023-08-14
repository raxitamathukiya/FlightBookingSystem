const express=require('express')
const app=express()
const {userRouter}=require('./Router/user.route')
const {flightRouter}=require('./Router/flight.route')
const {bookingRouter}=require('./Router/booking.route')
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const {connection}=require("./db")
require('dotenv').config()
app.use(express.json())

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Air booking API Documentation',
        version: '1.0.0',
      },
    },
    apis: ['./Router/*.js'], // files containing annotations as above
  };
  
  const openapiSpecification = swaggerJsdoc(options);
  app.use("/airapi",swaggerUi.serve,swaggerUi.setup(openapiSpecification))
    app.get('/',async(req,res)=>{
    try {
        res.status(200).send("Welcome to Air flight booking system")
    } catch (error) {
        console.log(error)
    }
})
app.use('/api',userRouter)
app.use('/api',flightRouter)
app.use('/api',bookingRouter)
app.listen(8080,()=>{
    console.log("server is running .....")
})