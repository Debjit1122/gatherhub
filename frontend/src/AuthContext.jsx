// AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    // Function to log the user in
    const login = (userData) => {
        setIsLoggedIn(true);
        setUserData(userData); // Store the entire userData object in the state

        // Store the userData in localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    // Function to log the user out
    const logout = () => {
        setIsLoggedIn(false);
        setUserData(null); // Clear the userData from the state
        Cookies.remove('access_token'); // Remove the 'access_token' cookie
        localStorage.removeItem('userData'); // Clear the userData from localStorage
    };

    // Fetch the userData from localStorage on component mount
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            setUserData(parsedUserData);
            setIsLoggedIn(true);
        }
    }, []);

    // Check token expiration on component mount and set a timer to log out when the token expires
    useEffect(() => {
        const token = Cookies.get('access_token');
        if (token) {
            const decodedToken = jwt_decode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                console.log("User logged out");
                logout();
            } else {
                setIsLoggedIn(true);
                const tokenExpirationTime = (decodedToken.exp - currentTime) * 1000; // Convert to milliseconds
                const logoutTimer = setTimeout(logout, tokenExpirationTime); // Schedule a logout when the token expires

                // Clear the logout timer when the component unmounts or the token is removed
                return () => clearTimeout(logoutTimer);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
