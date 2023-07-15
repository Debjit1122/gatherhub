const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true,
    },
    name: String,
    description: String,
    detailedInfo: String,
    venue: String,
    category: String,
    isChoosingDateRange: Boolean,
    startDate: Date,
    endDate: Date,
    timeSlots: [{
        date: String,
        startTime: String,
        endTime: String
    }],
    selectedTimezone: {
        value: String,
        label: String
    },
    selectedCurrency: {
        value: String,
        label: String,
        symbol: String,
        flag: {
            title: String
        }
    },
    price: Number,
    salePrice: Number,
    discountCoupon: String,
    tickets: {
        total: Number,
        sold: Number,
        unsold: Number
    }
});

module.exports = mongoose.model('Event', EventSchema);
