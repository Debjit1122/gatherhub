// import React, { createContext, useState, useEffect } from 'react';

// export const UserContext = createContext();

// class ErrorBoundary extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { hasError: false };
//     }

//     static getDerivedStateFromError(error) {
//         return { hasError: true };
//     }

//     componentDidCatch(error, errorInfo) {
//         console.error('Error caught by error boundary:', error, errorInfo);
//     }

//     render() {
//         if (this.state.hasError) {
//             return <h1>Something went wrong. Please try again later.</h1>;
//         }

//         return this.props.children;
//     }
// }

// export const UserProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [userData, setUserData] = useState(null);

//     useEffect(() => {
//         const savedState = localStorage.getItem('isLoggedIn');
//         const savedUser = localStorage.getItem('userData');

//         if (savedState !== null) {
//             setIsLoggedIn(JSON.parse(savedState));
//         }

//         if (savedUser !== null && savedUser !== 'undefined') {
//             setUserData(JSON.parse(savedUser));
//         }
//     }, []);

//     const setLogin = (state, user) => {
//         localStorage.setItem('isLoggedIn', JSON.stringify(state));

//         if (user) {
//             localStorage.setItem('userData', JSON.stringify(user));
//             setUserData(user);
//         } else {
//             localStorage.removeItem('userData');
//             setUserData(null);
//         }

//         setIsLoggedIn(state);
//     }

//     return (
//         <ErrorBoundary>
//             <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn: setLogin, userData }}>
//                 {children}
//             </UserContext.Provider>
//         </ErrorBoundary>
//     );
// };
