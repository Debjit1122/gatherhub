import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FiPlus } from 'react-icons/fi'
import '../SignupModal.css';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
const Signup = ({ closeModal }) => {
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [checkboxError, setCheckboxError] = useState('');
    const [step, setStep] = useState(1);

    const { login } = useContext(AuthContext);
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
    const [signupError, setSignupError] = useState("");
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
                const response = await axios.post('http://localhost:5000/api/register', {
                    ...user,
                    interests: selectedInterests,
                    userID: undefined, // Exclude the userID field from the client-side object
                });

                if (response.data.success) {
                    const userData = response.data.user;

                    // Generate JWT token
                    const token = response.data.token;
                    // Store the token in local storage
                    document.cookie = `access_token=${token}; path=/; secure; samesite=strict; max-age=3600;`;
                    login(userData);
                    closeModal();
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
    return (
        <Form onSubmit={handleSubmit}>

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
                        {user.name && isAgeConfirmed && isValidPassword ? (
                            <Button variant="primary" onClick={handleNextStep}>
                                Next
                            </Button>
                        ) : (
                            <Button variant="primary" disabled>
                                Next
                            </Button>
                        )}
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
                        {user.phone && user.jobRole && user.company && user.department ? (
                            <Button variant="primary" onClick={handleNextStep}>
                                Next
                            </Button>
                        ) : (
                            <Button variant="primary" disabled>
                                Next
                            </Button>
                        )}
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
                        {
                            user.bio ? (
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            ) : (
                                <Button variant="primary" disabled>
                                    Submit
                                </Button>
                            )
                        }

                    </div>
                )}
            </div>
        </Form>
    )
}

export default Signup
