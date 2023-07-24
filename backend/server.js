require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/Users');
const Event = require('./models/Event');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`));

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ success: false, message: 'Email already in use' });
        }

        const userID = new mongoose.Types.ObjectId();

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = new User({ ...req.body, userID, password: hashedPassword });

        await user.save();
        const userResponse = { ...user.toObject() };
        delete userResponse.password;
        res.status(201).send({ success: true, message: 'User registered successfully', user: userResponse });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Error registering user', error: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ success: false, message: 'Invalid email or password' });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ success: false, message: 'Invalid email or password' });
        }

        const userResponse = { ...user.toObject() };
        delete userResponse.password;
        return res.status(200).send({ success: true, message: 'User authenticated successfully', user: userResponse });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error during login', error: err.message });
    }
});

app.post('/events', async (req, res) => {
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

    const eventId = uuidv4();

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
});

app.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).send({ success: true, events });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error fetching events', error: error.message });
    }
});

app.get('/events/:eventId', async (req, res) => {
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
});

app.post('/bookings', async (req, res) => {
    const { userId, eventId, tickets, totalPrice, paymentMethod } = req.body;

    try {
        const booking = new Booking({
            bookingId: uuidv4(),
            userId,
            eventId,
            tickets,
            totalPrice,
            paymentMethod,
        });

        await booking.save();
        res.status(201).send({ success: true, message: 'Booking created successfully', booking });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Error creating booking', error: err.message });
    }
});

app.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).send({ success: true, bookings });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error fetching bookings', error: error.message });
    }
});


