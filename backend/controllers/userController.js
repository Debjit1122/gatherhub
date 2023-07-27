const User = require('../models/Users');
const { hashPassword, comparePassword } = require('../middleware/bcrypt');
const { generateToken } = require('../middleware/jwt');
const { generateUUID } = require('../middleware/uuid');

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ success: false, message: 'Email already in use' });
        }

        const userID = generateUUID();

        const hashedPassword = hashPassword(password);
        const user = new User({ ...req.body, userID, password: hashedPassword });

        await user.save();

        const token = generateToken(user.userID);

        const userResponse = { ...user.toObject() };
        delete userResponse.password;
        res.status(201).send({ success: true, message: 'User registered successfully', user: userResponse, token: token });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Error registering user', error: err.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ success: false, message: 'Invalid email or password' });
        }

        const isPasswordValid = comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ success: false, message: 'Invalid email or password' });
        }

        // Generate a new token for the user
        const newToken = generateToken(user.userID);

        // If there was a previous token, you may want to handle its removal here
        // For example, if you store the token in a database, you can delete the previous token entry

        // Construct the user response without the password field
        const userResponse = { ...user.toObject() };
        delete userResponse.password;

        // Send the new token as part of the response
        return res.status(200).send({ success: true, message: 'User authenticated successfully', user: userResponse, token: newToken });
    } catch (err) {
        return res.status(500).send({ success: false, message: 'Error during login', error: err.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
