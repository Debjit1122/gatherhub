import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../SignupModal.css';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';

const Login = ({ closeModal }) => {
    const { login } = useContext(AuthContext);
    const [loginError, setLoginError] = useState("");
    const [user, setUser] = useState({ loginEmail: "", loginPassword: "" });

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setUser({ ...user, [name]: value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email: user.loginEmail,
                password: user.loginPassword,
            });
            if (response.data.success) {
                const userData = response.data.user;
                const token = response.data.token;

                // Set the JWT token as an HTTP-only cookie named 'jwt'
                document.cookie = `access_token=${token}; path=/; secure; samesite=strict; max-age=3600;`;

                localStorage.setItem('userData', JSON.stringify(userData));
                login(userData);
                closeModal();
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

    return (
        <div>
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
    );
};

export default Login;
