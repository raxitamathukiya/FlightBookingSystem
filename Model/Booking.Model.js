const mongoose=require('mongoose')
const BookingSchema=mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'Users'  },
	flight : { type: mongoose.Schema.Types.ObjectId, ref: 'Flights' }
})
const bookingModel=mongoose.model('Booking',BookingSchema)
module.exports={
    bookingModel
}