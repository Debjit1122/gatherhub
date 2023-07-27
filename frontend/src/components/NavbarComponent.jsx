import { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import SignupModal from './SignupModal';
import Dropdown from 'react-bootstrap/Dropdown';
import { AuthContext } from '../AuthContext';
import './NavbarComponent.css';

function NavBarComponent() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isLoggedIn, userData, logout } = useContext(AuthContext);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setIsScrolled(true);
            setIsModalOpen(false); // Hide the modal on scroll
        } else {
            setIsScrolled(false);
        }
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleLogout = () => {
        logout(isLoggedIn)
        logout(userData)
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Navbar fixed="top" collapseOnSelect expand="lg" variant="light" className={`custom-navbar ${isScrolled ? 'scrolled' : ''}`}>
                <Container>
                    <Navbar.Brand href="#home">
                        <h3 className={`fw-bold ${isScrolled ? '' : 'text-white'}`}>Gather<span style={{ color: "var(--primary-color)" }}>Hub</span></h3>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto" />
                        <Nav className="gap-3">
                            <Nav.Link href="/" className="custom-link">
                                Home
                            </Nav.Link>
                            <Nav.Link eventKey={2} href="/#about" className="custom-link">
                                About Us
                            </Nav.Link>
                            <Nav.Link eventKey={3} href="/events" className="custom-link">
                                Events
                            </Nav.Link>
                            <Nav.Link eventKey={4} href="/" className="custom-link">
                                Contact Us
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    {!isLoggedIn && (
                        <Button className="navbar-cta ms-4" onClick={handleModalOpen}>
                            Get Started
                        </Button>
                    )}
                    {isLoggedIn && (
                        <Dropdown>
                            <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="profile">
                                <img src='https://place-hold.it/70' alt='profile' className='profile-img rounded-circle ms-4' />
                            </Dropdown.Toggle>

                            <Dropdown.Menu align="right" className="dropdown-menu">
                                <Dropdown.Item href="/">Your Events</Dropdown.Item>
                                <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
                                <Dropdown.Item href="/">Settings</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item
                                    href="/"
                                    className='link-danger'
                                    onClick={handleLogout}
                                >
                                    log out
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </Container>
            </Navbar>
            {isModalOpen && <SignupModal show={isModalOpen} handleClose={() => setIsModalOpen(false)} />}
        </>
    );
}

export default NavBarComponent;
