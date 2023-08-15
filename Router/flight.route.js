const express=require('express')
const flightRouter=express.Router()
const {flightModel}=require('../Model/Flight.Model')

/**
* @swagger
* components:
*   schemas:
*       Flights:
*       type: object
*       properties:
*           id:
*               type: string
*               description: The auto-generated id of the user
*           airline:
*               type: string
*               description: The airline
*           flightNo:
*               type: string
*               description: The flightNo
*           arrival:
*               type: string
*               description: The arrival
*           departureTime:
*               type: date
*               description: The departureTime
*           arrivalTime:
*               type: date
*               description: The arrivalTime
*           seats:
*               type: number
*               description: The seats number
*           price:
*               type: number
*               description: The price
*/


/**
 * @swagger
 * tags:
 *  name: Flights
 *  description: All the API routes realeted the Flights
 */
/**
 * @swagger
 * /api/flights:
 *  post:
 *      summary: This will Add new flights from DataBase
 *      tags: [Flights]
 *      responses:
 *          200:
 *              description: Add New flights 
 *          400:
 *              description: Inccorect Request!!!!
 */

/**
 * @swagger
 * /api/flights:
 *  get:
 *      summary: This will  show all flights from DataBase
 *      tags: [Flights]
 *      responses:
 *          200:
 *              description: show all flights data
 *          400:
 *              description: Inccorect Request!!!!
 */

/**
 * @swagger
 * /api/flights/:id:
 *  get:
 *      summary: This will show flights data based on id parhams from DataBase
 *      tags: [Flights]
 *      responses:
 *          200:
 *              description: show only one flight data 
 *          400:
 *              description: Inccorect Request!!!!
 */

/**
 * @swagger
 * /api/flights/:id:
 *  put:
 *      summary: This will Update flights data from DataBase
 *      tags: [Flights]
 *      responses:
 *          200:
 *              description: successfully Update the data 
 *          400:
 *              description: Inccorect Request!!!!
 */

/**
 * @swagger
 * /api/flights/:id:
 *  delete:
 *      summary: This will delete the flights from DataBase
 *      tags: [Flights]
 *      responses:
 *          200:
 *              description: delete the flights 
 *          400:
 *              description: Inccorect Request!!!!
 */
// airline: {type:String,require:true},
//     flightNo: {type:String,require:true},
//     departure: {type:String,require:true},
//     arrival: {type:String,require:true},
//     departureTime: {type:Date,require:true},
//     arrivalTime: {type:Date,require:true},
//     seats: {type:Number,require:true},
//     price: {type:Number,require:true}

flightRouter.post('/flights',async(req,res)=>{
    try {
        const {airline,
            flightNo,
            departure,
            arrival,
            departureTime,
            arrivalTime,
            seats,
            price}=req.body
            let data=new flightModel({airline,
                flightNo,
                departure,
                arrival,
                departureTime,
                arrivalTime,
                seats,
                price})

            data.save()
            res.status(201).send({message:"flight data added !!!!"})
       
    } catch (error) {
        console.log(error)
    }
})

flightRouter.get('/flights',async(req,res)=>{
    try {
        let data=await flightModel.find()
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})
flightRouter.get('/flights/:id',async(req,res)=>{
    try {
        let {id}=req.params
        let data=await flightModel.find({_id:id})
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})
flightRouter.put('/flights/:id',async(req,res)=>{
    try {
        let id=req.params.id
        let data= await flightModel.findByIdAndUpdate(id,req.body)
        res.status(200).send("update data")
    } catch (error) {
        console.log(error)
    }
})
flightRouter.delete('/flights/:id',async(req,res)=>{
    try {
        let id=req.params.id
        let data= await flightModel.findByIdAndDelete(id)
        res.status(200).send("delete data")
    } catch (error) {
        console.log(error)
    }
})


module.exports={
    flightRouter
}

// "airline": "aero",
// "flightNo": "1234567",
// "departure": "ahmdabad",
// "arrival": "delhi",
// "departureTime": "2023-12-25",
// "arrivalTime": "2023-12-26",
// "seats": 12,
// "price": 5000