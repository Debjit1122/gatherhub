import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './FooterComponent.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'

function FooterComponent() {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col md={2} className="footer-column">
                        <div className="footer-logo">
                            <img src="" alt="Company Logo" />
                        </div>

                    </Col>
                    <Col md={3} className="footer-column">
                        <h4 className="footer-column-title">Contact Us</h4>
                        <p className="footer-column-text">
                            123 Street, City Name<br />
                            State, Country<br />
                            Phone: +1234567890<br />
                            Email: info@example.com
                        </p>
                    </Col>
                    <Col md={4} className="footer-column">
                        <h4 className="footer-column-title">Links</h4>
                        <div className="d-flex gap-5">
                            <ul className="footer-links">
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <a href="/about">About</a>
                                </li>
                                <li>
                                    <a href="/services">Services</a>
                                </li>
                                <li>
                                    <a href="/contact">Contact</a>
                                </li>
                            </ul>
                            <ul className="footer-links">
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <a href="/about">About</a>
                                </li>
                                <li>
                                    <a href="/services">Services</a>
                                </li>
                                <li>
                                    <a href="/contact">Contact</a>
                                </li>
                            </ul>
                            <ul className="footer-links">
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <a href="/about">About</a>
                                </li>
                                <li>
                                    <a href="/services">Services</a>
                                </li>
                                <li>
                                    <a href="/contact">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col md={2} className="footer-column">
                        <h4 className="footer-column-title">Follow Us</h4>
                        <div className="social-icons">
                            <a href="#" className="social-icon">
                                <FaFacebook />
                            </a>
                            <a href="#" className="social-icon">
                                <FaTwitter />
                            </a>
                            <a href="#" className="social-icon">
                                <FaInstagram />
                            </a>
                            <a href="#" className="social-icon">
                                <FaLinkedin />
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <p className="footer-bottom-text">
                            &copy; {new Date().getFullYear()} Company Name. All rights reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default FooterComponent;
