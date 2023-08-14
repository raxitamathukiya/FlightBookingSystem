const express=require('express')
const flightRouter=express.Router()
const {flightModel}=require('../Model/Flight.Model')

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