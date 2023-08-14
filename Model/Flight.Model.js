const mongoose=require('mongoose')
const FlightSchema=mongoose.Schema({
    airline: {type:String,require:true},
    flightNo: {type:String,require:true},
    departure: {type:String,require:true},
    arrival: {type:String,require:true},
    departureTime: {type:Date,require:true},
    arrivalTime: {type:Date,require:true},
    seats: {type:Number,require:true},
    price: {type:Number,require:true}
})

const flightModel=mongoose.model('Flights',FlightSchema)
module.exports={
    flightModel
}