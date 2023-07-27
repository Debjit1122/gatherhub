const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
};

const refreshToken = (oldToken) => {
    const decodedToken = jwt.decode(oldToken);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp - currentTime > 60) {
        // If the token expiration time is more than 1 minute from now, return the same token
        return oldToken;
    } else {
        // If the token has expired or will expire in less than 1 minute, generate a new token
        const newToken = generateToken(decodedToken.userId);
        return newToken;
    }
};

module.exports = {
    generateToken,
    refreshToken,
};
