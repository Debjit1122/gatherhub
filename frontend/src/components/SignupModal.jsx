import { useContext, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi'
import './SignupModal.css';
import { UserContext } from '../UserContext';
import axios from 'axios';

const SignupModal = ({ show, handleClose }) => {
    const [isEmailSignup, setIsEmailSignup] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [checkboxError, setCheckboxError] = useState('');
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [step, setStep] = useState(1);
    const handlePreviousStep = () => {
        setStep(step - 1);
    };
    const { setIsLoggedIn } = useContext(UserContext);
    const locations = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla",
        "Antarctica", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia",
        "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
        "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia-Herzegovina",
        "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia",
        "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Africa", "Chad", "Chile",
        "China", "Colombia", "Comoros", "Congo", "Congo (Dem. Rep.)", "Cook Islands", "Costa Rica",
        "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
        "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
        "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland",
        "France", "French Guiana", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany",
        "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala",
        "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland",
        "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica",
        "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (South)", "Kosovo", "Kuwait",
        "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
        "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali",
        "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico",
        "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
        "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia",
        "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norway", "Oman", "Pakistan",
        "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
        "Poland", "Portugal", "Qatar", "Réunion", "Romania", "Russia", "Rwanda", "Sahara", "Samoa",
        "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
        "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka",
        "St. Helena", "St. Kitts & Nevis", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden",
        "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Terres Australes", "Thailand",
        "Togo", "Tokelau", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
        "U.A.E.", "USA", "Uganda", "Ukraine", "United Kingdom", "Uruguay", "Uzbekistan", "Vanuatu",
        "Vatican", "Venezuela", "Vietnam", "Virgin Islands", "Wallis & Futuna", "Yemen", "Zambia", "Zimbabwe"];
    const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [signupError, setSignupError] = useState("");
    const [lastActivity, setLastActivity] = useState(Date.now());
    const [user, setUser] = useState({
        name: "", email: "", password: "", location: "India", loginEmail: "", loginPassword: "", phone: "",
        jobRole: "",
        company: "",
        department: "",
        bio: "",
        interests: ""
    });

    const [selectedInterests, setSelectedInterests] = useState([]);
    const interestOptions = [
        "Conferences",
        "Exhibitions",
        "Workshops",
        "Networking",
        "Product Launches",
        "Charity",
        "Social",
        "Sports",
        "Virtual",
        "Music",
        "Educational",
        "Community",
        "Recruitment",
        "Training",
        "Hackathons",
        "Food",
        "Fashion",
        "Health"
        // Add more options as needed
    ];

    let name, value;

    const handleInputs = (e) => {
        name = e.target.name;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
            setUser({ ...user, [name]: value });
            if (name === "ageConfirmation") {
                setIsAgeConfirmed(value);
                setCheckboxError(value ? '' : 'You must confirm that you are at least 18 years old');
            }
        } else {
            value = e.target.value;
            setUser({ ...user, [name]: value });
            if (name === "password") {
                setIsValidPassword(validatePassword(value));
                setPasswordError(validatePassword(value) ? '' : 'Password must contain at least 8 characters, one uppercase, one digit, and one special character');
            }
        }
    }

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const validatePassword = (password) => {
        const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        return regex.test(password);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValidPassword && isAgeConfirmed) {
            try {
                const response = await axios.post('https://gatherhub-backend.vercel.app/register', {
                    ...user,
                    interests: selectedInterests,
                    userID: undefined, // Exclude the userID field from the client-side object
                });

                if (response.data.success) {
                    const userData = response.data.user;

                    // Generate JWT token
                    const token = response.data.token;

                    // Store the token in local storage
                    localStorage.setItem('token', token);

                    setIsLoggedIn(true, userData);
                    console.log(userData);
                    handleClose();
                } else {
                    setSignupError(response.data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                let message = '';
                if (error.response) {
                    if (error.response.status === 400) {
                        message = 'Email already in use. Please login instead.';
                    } else if (error.response.status === 500) {
                        message = 'Error registering user. Please try again later.';
                    }
                } else {
                    message = 'Cannot reach server. Please check your network connection.';
                }
                setSignupError(message);
            }
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://gatherhub-backend.vercel.app/login', {
                email: user.loginEmail,
                password: user.loginPassword,
            });
            if (response.data.success) {
                const userData = response.data.user;

                // Generate JWT token
                const token = response.data.token;

                // Store the token in local storage
                localStorage.setItem('token', token);

                setIsLoggedIn(true, userData);
                console.log(userData);
                handleClose();
            } else {
                setLoginError(response.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            let message = '';
            if (error.response) {
                if (error.response.status === 400) {
                    message = 'Invalid email or password. Please try again.';
                } else if (error.response.status === 500) {
                    message = 'Error during login. Please try again later.';
                }
            } else {
                message = 'Cannot reach server. Please check your network connection.';
            }
            setLoginError(message);
        }
    };

    const decodeToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    const handleEmailSignup = () => {
        setIsEmailSignup(true);
    };

    const handleLoginForm = () => {
        setShowLoginForm(true);
    };

    const handleUserActivity = () => {
        setLastActivity(Date.now());
    };

    const logout = () => {
        // Clear the token from local storage
        localStorage.removeItem('token');

        // Perform any additional logout actions (e.g., resetting user context)
        setIsLoggedIn(false);
        // ...
    };

    function handleCallbackResponse(response) {
        const token = response.credential;
        const decodedToken = decodeToken(token);
        if (decodedToken) {
            console.log("Decoded JWT Token:", decodedToken);

            // Store the token in local storage
            localStorage.setItem('token', token);

            setIsLoggedIn(true);
            handleClose();
        } else {
            console.error('Invalid JWT Token');
        }

        const resetTimeout = () => {
            clearTimeout(logoutTimeout);
            logoutTimeout = setTimeout(() => {
                // Perform logout actions here
                logout();
            }, 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds
        };

        // Attach the event listener to track user activity
        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);
        window.addEventListener('scroll', handleUserActivity);
        window.addEventListener('touchstart', handleUserActivity);

        // Set initial timeout on component mount
        let logoutTimeout = setTimeout(() => {
            // Perform logout actions here
            logout();
        }, 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds

        // Reset the timeout whenever there is user activity
        resetTimeout();

        // Clear the timeout and remove event listeners on component unmount
        return () => {
            clearTimeout(logoutTimeout);
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
            window.removeEventListener('scroll', handleUserActivity);
            window.removeEventListener('touchstart', handleUserActivity);
        };
    }

    const checkLoggedIn = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = decodeToken(token);
            if (decodedToken) {
                // Set the user context as logged in
                setIsLoggedIn(true);
            } else {
                // Invalid token, clear it from local storage
                localStorage.removeItem('token');
            }
        }
    };


    const handleInterestClick = (option) => {
        const updatedInterests = [...selectedInterests];
        if (updatedInterests.includes(option)) {
            // Remove the interest if already selected
            const index = updatedInterests.indexOf(option);
            updatedInterests.splice(index, 1);
        } else {
            // Add the interest if not already selected
            updatedInterests.push(option);
        }
        setSelectedInterests(updatedInterests);
    };


    useEffect(() => {
        checkLoggedIn();
        /*Global Google*/
        google.accounts.id.initialize({
            client_id: "632053271053-51pkd8327lhit0gh9s8t1q65p5lsht9n.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("signInButton"),
            { theme: "outline", width: 380 }
        )
    }, []);

    return (
        <Modal show={show} onHide={handleClose} centered id="signup-modal">
            <Modal.Header closeButton>
                {!showLoginForm && (
                    <Modal.Title>
                        {step === 1 ? (
                            'Signup'
                        ) : (
                            <Button variant="link" onClick={handlePreviousStep} className="back-button">
                                <FaArrowLeft />
                            </Button>
                        )}
                    </Modal.Title>
                )}
                {showLoginForm && (
                    <Modal.Title>
                        {step === 1 ? (
                            'Login'
                        ) : (
                            <Button variant="link" onClick={handlePreviousStep}>
                                <FaArrowLeft />
                            </Button>
                        )}
                    </Modal.Title>
                )}
            </Modal.Header>
            <Modal.Body>
                {!isEmailSignup && !showLoginForm ? (
                    <div>
                        <div className="alternative-signup">
                            <div id="signInButton"></div>
                            <Button variant="primary" onClick={handleEmailSignup}>
                                <FaEnvelope />Sign Up with email
                            </Button>
                        </div>
                        <div className="already-member">
                            Already a member?{' '}
                            <span onClick={handleLoginForm} className="login-text">
                                Log in
                            </span>
                        </div>
                    </div>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        {showLoginForm ? (
                            <div>
                                {/* Add your login form fields here */}
                                <Form.Group controlId="loginEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="loginEmail"
                                        required
                                        value={user.loginEmail}
                                        onChange={handleInputs}
                                        autoComplete="off"
                                    />
                                </Form.Group>

                                <Form.Group controlId="loginPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="loginPassword"
                                        required
                                        value={user.loginPassword}
                                        onChange={handleInputs}
                                        autoComplete="off"
                                    />
                                </Form.Group>
                                {loginError && <p className="text-danger mb-2">{loginError}</p>}

                                <Button variant="primary" type="submit" onClick={handleLogin}>
                                    Login
                                </Button>
                            </div>
                        ) : (
                            <div>
                                {step === 1 && (
                                    <div>
                                        <Form.Group controlId="name">
                                            <Form.Label>Your Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your name"
                                                name="name"
                                                required
                                                value={user.name}
                                                onChange={handleInputs}
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="email">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                name="email"
                                                required
                                                value={user.email}
                                                onChange={handleInputs}
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                name="password"
                                                required
                                                value={user.password}
                                                onChange={handleInputs}
                                                autoComplete="off"
                                            />
                                            <Form.Text className="text-danger mb-2">{passwordError}</Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="location">
                                            <Form.Label>Location</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="location"
                                                value={user.location}
                                                onChange={handleInputs}
                                            >
                                                {locations.map((location) => (
                                                    <option key={location}>{location}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="ageConfirmation">
                                            <Form.Check
                                                type="checkbox"
                                                label="Confirm that you are at least 18 years old"
                                                name="ageConfirmation"
                                                checked={isAgeConfirmed}
                                                onChange={handleInputs}
                                            />
                                            {checkboxError && <Form.Text className="text-danger">{checkboxError}</Form.Text>}
                                        </Form.Group>
                                        {signupError && <p className="text-danger mb-2">{signupError}</p>}
                                        <Button variant="primary" onClick={handleNextStep}>
                                            Next
                                        </Button>
                                    </div>
                                )}
                                {step === 2 && (
                                    <div>
                                        <Form.Group controlId="phone">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter phone number"
                                                name="phone"
                                                required
                                                value={user.phone}
                                                onChange={handleInputs}
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="jobRole">
                                            <Form.Label>Job Role</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter job role"
                                                name="jobRole"
                                                required
                                                value={user.jobRole}
                                                onChange={handleInputs}
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="company">
                                            <Form.Label>Company Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter company name"
                                                name="company"
                                                required
                                                value={user.company}
                                                onChange={handleInputs}
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="department">
                                            <Form.Label>Department</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter department"
                                                name="department"
                                                required
                                                value={user.department}
                                                onChange={handleInputs}
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                        <Button variant="primary" onClick={handleNextStep}>
                                            Next
                                        </Button>
                                    </div>
                                )}
                                {step === 3 && (
                                    <div>
                                        <Form.Group controlId="bio">
                                            <Form.Label>Short bio</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter short bio"
                                                name="bio"
                                                required
                                                value={user.bio}
                                                onChange={handleInputs}
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="interests">
                                            <Form.Label>Interests</Form.Label>
                                            <div className="interest-buttons">
                                                {interestOptions.map((option) => (
                                                    <Button
                                                        key={option}
                                                        variant={selectedInterests.includes(option) ? "primary" : "outline"}
                                                        onClick={() => handleInterestClick(option)}
                                                        className={`interest-button ${selectedInterests.includes(option) ? "selected" : ""}`}
                                                    >
                                                        {option} <FiPlus className="plus-icon" />
                                                    </Button>
                                                ))}
                                            </div>
                                        </Form.Group>

                                        {signupError && <p className="text-danger mb-2">{signupError}</p>}
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );


};

export default SignupModal;
