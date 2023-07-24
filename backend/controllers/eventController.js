const mongoose = require('mongoose')
const Event = require('../models/Event');
const createEvent = async (req, res) => {
    let {
        name,
        description,
        detailedInfo,
        venue,
        category,
        isChoosingDateRange,
        startDate,
        endDate,
        timeSlots,
        selectedTimezone,
        selectedCurrency,
        price,
        salePrice,
        discountCoupon
    } = req.body;

    timeSlots = timeSlots || [];

    const eventId = new mongoose.Types.ObjectId();

    try {
        const event = new Event({
            eventId,
            name,
            description,
            detailedInfo,
            venue,
            category,
            isChoosingDateRange,
            startDate,
            endDate,
            timeSlots,
            selectedTimezone,
            selectedCurrency,
            price,
            salePrice,
            discountCoupon
        });
        await event.save();
        res.status(201).send({ success: true, message: 'Event created successfully', event });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Error creating event', error: err.message });
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).send({ success: true, events });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error fetching events', error: error.message });
    }
};

const getEventById = async (req, res) => {
    const { eventId } = req.params;

    try {
        const event = await Event.findOne({ eventId });
        if (!event) {
            return res.status(404).send({ success: false, message: 'Event not found' });
        }

        res.status(200).send({ success: true, event });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error fetching event', error: error.message });
    }
};

module.exports = {
    createEvent,
    getEvents,
    getEventById,
};
