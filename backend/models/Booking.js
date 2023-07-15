const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    bookingId: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    tickets: Number,
    totalPrice: Number,
    dateBooked: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    paymentMethod: String,
    paymentStatus: {
        type: String,
        enum: ['paid', 'pending'],
        default: 'pending'
    },
});

module.exports = mongoose.model('Booking', BookingSchema);
