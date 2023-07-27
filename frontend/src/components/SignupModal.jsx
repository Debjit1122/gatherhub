import { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import './SignupModal.css';
import Login from './Forms/Login';
import Signup from './Forms/Signup';
import { AuthContext } from '../AuthContext';

const SignupModal = ({ show, handleClose }) => {
    const [isEmailSignup, setIsEmailSignup] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [step, setStep] = useState(1);
    const [modalVisible, setModalVisible] = useState(show);
    const authContext = useContext(AuthContext);
    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleEmailSignup = () => {
        setIsEmailSignup(true);
    };

    const handleLoginForm = () => {
        setShowLoginForm(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <Modal show={modalVisible} onHide={handleClose} centered id="signup-modal">
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
                {!isEmailSignup && !showLoginForm && !authContext.isLoggedIn ? (
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
                    <div>
                        {showLoginForm ? (
                            <Login closeModal={closeModal} />
                        ) : (
                            <Signup closeModal={closeModal} />
                        )}
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );


};

export default SignupModal;
