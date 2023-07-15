const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userID: String,
    name: String,
    email: String,
    password: String,
    location: String,
    bio: String,
    phone: String,
    jobRole: String,
    department: String,
    company: String,
    interests: [{ type:String }],
    eventsAdded: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});

module.exports = mongoose.model('User', UserSchema);
