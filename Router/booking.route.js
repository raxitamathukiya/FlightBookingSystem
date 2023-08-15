const express=require('express')
const bookingRouter=express.Router()
const {bookingModel}=require('../Model/Booking.Model')

/**
* @swagger
* components:
*   schemas:
*       Booking:
*       type: object
*       properties:
*           id:
*               type: string
*               description: The auto-generated id of the user
*           user:
*               type: string
*               description: The user id
*           flight:
*               type: string
*               description: The flight id
*          
*/


/**
 * @swagger
 * tags:
 *  name: Booking
 *  description: All the API routes realeted the Booking
 */
/**
 * @swagger
 * /api/booking:
 *  post:
 *      summary: This will Add new booking data from DataBase
 *      tags: [Booking]
 *      responses:
 *          200:
 *              description: successfully booking done 
 *          400:
 *              description: Inccorect Request!!!!
 */

/**
 * @swagger
 * /api/dashboard:
 *  get:
 *      summary: This will show all booking data from DataBase
 *      tags: [Booking]
 *      responses:
 *          200:
 *              description: show booking data 
 *          400:
 *              description: Inccorect Request!!!!
 */

/**
 * @swagger
 * /api/dashboard/:id:
 *  put:
 *      summary: This will update booking data from DataBase
 *      tags: [Booking]
 *      responses:
 *          200:
 *              description: update booking data 
 *          400:
 *              description: Inccorect Request!!!!
 */

/**
 * @swagger
 * /api/dashboard/:id:
 *  delete:
 *      summary: This will delete booking data from DataBase
 *      tags: [Booking]
 *      responses:
 *          200:
 *              description: delete booking data 
 *          400:
 *              description: Inccorect Request!!!!
 */

bookingRouter.post("/booking",async(req,res)=>{
    try {
        const { user,flight  }=req.body
                let data=new bookingModel({user,flight})
                data.save()
                res.status(201).send({message:"booking done!!!!"})
       
    } catch (error) {
        console.log(error)
    }
})
bookingRouter.get("/dashboard",async(req,res)=>{
    try {
       const booking=await bookingModel.find({}).populate('user',"name email")
       .populate('flight',"airline flightNo departure arrival departureTime arrivalTime seats price")
       res.status(200).send(booking)
       
    } catch (error) {
        console.log(error)
    }
})

bookingRouter.put('/dashboard/:id',async(req,res)=>{
    try {
        let id=req.params.id
        let data= await bookingModel.findByIdAndUpdate(id,req.body)
        res.status(200).send("update data")
    } catch (error) {
        console.log(error)
    }
})
bookingRouter.delete('/dashboard/:id',async(req,res)=>{
    try {
        let id=req.params.id
        let data= await bookingModel.findByIdAndDelete(id)
        res.status(200).send("delete data")
    } catch (error) {
        console.log(error)
    }
})

module.exports={bookingRouter}