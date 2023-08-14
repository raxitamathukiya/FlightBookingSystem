const express=require('express')
const bookingRouter=express.Router()
const {bookingModel}=require('../Model/Booking.Model')
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