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
    const [scrollAmount, setScrollAmount] = useState({
        offset: window.scrollY
    });
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        function handleScroll() {
            setScrollAmount({
                offset: window.scrollY
            })
        }

        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    const isScrolled = scrollAmount.offset >= 100;
    const isLargeWindowSize = windowSize.width >= 991;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isLoggedIn, userData, logout } = useContext(AuthContext);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleLogout = () => {
        logout(isLoggedIn)
        logout(userData)
    };

    return (
        <>
            <Navbar fixed={isLargeWindowSize ? 'top' : ''} collapseOnSelect expand="lg" variant={isScrolled ? '' : (isLargeWindowSize ? 'dark' : '')} bg={isScrolled ? 'light' : (isLargeWindowSize ? '' : 'light')} className={isScrolled ? 'custom-navbar-scrolled' : 'custom-navbar'}>
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
                                <img src='https://place-hold.it/40' alt='profile' className='profile-img img-fluid rounded-circle' />
                            </Dropdown.Toggle>

                            <Dropdown.Menu align="end" className="profile-dropdown dropdown-menu-end">
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
