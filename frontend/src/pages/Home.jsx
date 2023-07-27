import { useEffect, useState } from 'react';
import './Home.css';
import NavBar from '../components/NavbarComponent';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import { FaSearch, FaHandshake, FaCheckCircle, FaEnvelope } from 'react-icons/fa';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BsFillGridFill } from 'react-icons/bs';
import Footer from '../components/FooterComponent';
import heroImage1 from '../assets/hero-1.jpg';
import heroImage2 from '../assets/hero-2.jpg';
import heroImage3 from '../assets/hero-3.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { server } from '../main';

const Home = () => {
    const [eventData, setEventData] = useState([]);
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await axios.get(`${server}/api/events`); // Replace '/api/events' with the actual API endpoint for fetching event data
                setEventData(response.data.events); // Assuming the response data has an 'events' property that contains an array of event objects
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchEventData();
    }, []);


    return (
        <div className="home">
            <NavBar />
            {/* Hero Section */}
            {/* Hero Section */}
            <section id="home" className="hero">
                <Carousel indicators={false}>
                    <Carousel.Item style={{ backgroundImage: `url(${heroImage1})` }}>
                        <div className="overlay"></div>
                        <div className="carousel-caption d-none d-md-block">
                            <h1>Discover and Attend Exciting Events</h1>
                            <p>Find and explore a wide range of events happening near you</p>
                            <a href="#events" className="btn btn-primary cta-button">See Upcoming Events</a>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item style={{ backgroundImage: `url(${heroImage2})` }}>
                        <div className="overlay"></div>
                        <div className="carousel-caption d-none d-md-block">
                            <h1>Create your own event</h1>
                            <p>Bring your vision to life and turn your passion into a successful event</p>
                            <a href="/create-event" className="btn btn-primary cta-button">Create an Event</a>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </section>

            {/* Featured Events Section */}

            <section className="featured-events">
                <Container>
                    <h2 className="section-title">Featured Events</h2>
                    <div className="card-row">
                        {eventData.map((event) => {
                            const formattedStartDate = event.startDate
                                ? new Date(event.startDate).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                    timeZone: event.selectedTimezone.value,
                                })
                                : '';
                            const formattedEndDate = event.endDate
                                ? new Date(event.endDate).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                    timeZone: event.selectedTimezone.value,
                                })
                                : '';

                            const formattedTimeSlots = event.timeSlots.map((slot) => {
                                const formattedStartTime = new Date(
                                    new Date(slot.date).setHours(
                                        parseInt(slot.startTime.split(':')[0]),
                                        parseInt(slot.startTime.split(':')[1])
                                    )
                                ).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    timeZone: event.selectedTimezone.value,
                                });

                                const formattedEndTime = new Date(
                                    new Date(slot.date).setHours(
                                        parseInt(slot.endTime.split(':')[0]),
                                        parseInt(slot.endTime.split(':')[1])
                                    )
                                ).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    timeZone: event.selectedTimezone.value,
                                });

                                const formattedDate = new Date(slot.date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                    timeZone: event.selectedTimezone.value,
                                });

                                return `${formattedDate}, ${formattedStartTime} - ${formattedEndTime}`;
                            });

                            return (
                                <div className="featured-card" key={event.eventId}>
                                    <div className="image-container">
                                        <img src="https://place-hold.it/300x500" alt={event.name} />
                                    </div>
                                    <div className="featured-details">
                                        <h2>{event.name}</h2>
                                        {event.endDate ? (
                                            <p className="text-muted">
                                                <AiOutlineCalendar />
                                                <span>
                                                    {formattedStartDate} - {formattedEndDate} (Timezone: {event.selectedTimezone.label})
                                                </span>
                                            </p>
                                        ) : (
                                            <p className="text-muted">
                                                <AiOutlineCalendar />
                                                <span>
                                                    {formattedTimeSlots[0]} (Timezone: {event.selectedTimezone.label})
                                                </span>
                                            </p>
                                        )}
                                        <p className="text-muted">
                                            <BsFillGridFill /> {event.category}
                                        </p>
                                        <p className='mb-3'>{event.description}</p>
                                        <Link to={`/events/${event.eventId}`} className="btn-primary text-decoration-none">
                                            Register
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </Container>
            </section>

            {/* Testimonials Section */}
            <div className="slider-1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="slider-container">
                                <Carousel prevIcon={null} nextIcon={null} indicators={false}>
                                    <Carousel.Item>
                                        <div className="row">
                                            <div className="col-md-4 mb-4">
                                                <div className="card text-center">
                                                    <img className="card-image rounded-circle" src="https://source.unsplash.com/200x200/?person" alt="testimonial" />
                                                    <div className="card-body">
                                                        <p className="testimonial-text">Elementum integer enim neque volutpat aliquam ultrices sagittis orci a scelerisque purus arcu dictum varius duis</p>
                                                        <p className="testimonial-author">Lorem Ipsum - Job Title</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <div className="card text-center">
                                                    <img className="card-image rounded-circle" src="https://source.unsplash.com/200x200/?person" alt="testimonial" />
                                                    <div className="card-body">
                                                        <p className="testimonial-text">Elementum integer enim neque volutpat aliquam ultrices sagittis orci a scelerisque purus arcu dictum varius duis</p>
                                                        <p className="testimonial-author">Lorem Ipsum - Job Title</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card text-center">
                                                    <img className="card-image rounded-circle" src="https://source.unsplash.com/200x200/?person" alt="testimonial" />
                                                    <div className="card-body">
                                                        <p className="testimonial-text">Elementum integer enim neque volutpat aliquam ultrices sagittis orci a scelerisque purus arcu dictum varius duis</p>
                                                        <p className="testimonial-author">Lorem Ipsum - Job Title</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className="row">
                                            <div className="col-md-4 mb-4">
                                                <div className="card text-center">
                                                    <img className="card-image rounded-circle" src="https://source.unsplash.com/200x200/?person" alt="testimonial" />
                                                    <div className="card-body">
                                                        <p className="testimonial-text">Elementum integer enim neque volutpat aliquam ultrices sagittis orci a scelerisque purus arcu dictum varius duis</p>
                                                        <p className="testimonial-author">Lorem Ipsum - Job Title</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <div className="card text-center">
                                                    <img className="card-image rounded-circle" src="https://source.unsplash.com/200x200/?person" alt="testimonial" />
                                                    <div className="card-body">
                                                        <p className="testimonial-text">Elementum integer enim neque volutpat aliquam ultrices sagittis orci a scelerisque purus arcu dictum varius duis</p>
                                                        <p className="testimonial-author">Lorem Ipsum - Job Title</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card text-center">
                                                    <img className="card-image rounded-circle" src="https://source.unsplash.com/200x200/?person" alt="testimonial" />
                                                    <div className="card-body">
                                                        <p className="testimonial-text">Elementum integer enim neque volutpat aliquam ultrices sagittis orci a scelerisque purus arcu dictum varius duis</p>
                                                        <p className="testimonial-author">Lorem Ipsum - Job Title</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className="row">
                                            <div className="col-md-4 mb-4">
                                                <div className="card text-center">
                                                    <img className="card-image rounded-circle" src="https://source.unsplash.com/200x200/?person" alt="testimonial" />
                                                    <div className="card-body">
                                                        <p className="testimonial-text">Elementum integer enim neque volutpat aliquam ultrices sagittis orci a scelerisque purus arcu dictum varius duis</p>
                                                        <p className="testimonial-author">Lorem Ipsum - Job Title</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <div className="card text-center">
                                                    <img className="card-image rounded-circle" src="https://source.unsplash.com/200x200/?person" alt="testimonial" />
                                                    <div className="card-body">
                                                        <p className="testimonial-text">Elementum integer enim neque volutpat aliquam ultrices sagittis orci a scelerisque purus arcu dictum varius duis</p>
                                                        <p className="testimonial-author">Lorem Ipsum - Job Title</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card text-center">
                                                    <img className="card-image rounded-circle" src="https://source.unsplash.com/200x200/?person" alt="testimonial" />
                                                    <div className="card-body">
                                                        <p className="testimonial-text">Elementum integer enim neque volutpat aliquam ultrices sagittis orci a scelerisque purus arcu dictum varius duis</p>
                                                        <p className="testimonial-author">Lorem Ipsum - Job Title</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* About Us Section */}
            <section className="about-us" id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <h2 className="section-title">About</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae metus nec mi luctus faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris luctus enim ac tellus posuere, at blandit massa eleifend.</p>
                            <p>Nulla interdum dui eu semper aliquet. Integer ut massa sed nibh hendrerit fringilla. Proin bibendum, lacus ut luctus egestas, mi leo volutpat nisi, ac tincidunt tortor justo nec libero. In id neque ac lectus tristique placerat.</p>
                            <a href="#" className="btn btn-primary">Learn More</a>
                        </div>
                        <div className="col-lg-6">
                            <img src="https://place-hold.it/300" alt="About Us" className="about-us-image" />
                        </div>
                    </div>
                </div>
            </section>


            {/* How It Works Section */}
            <section className="how-it-works">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="step">
                                <div className="step-icon">
                                    <FaSearch />
                                </div>
                                <h3 className="step-title">Step 1: Search</h3>
                                <p className="step-description">Search for events based on your interests and location.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="step">
                                <div className="step-icon">
                                    <FaHandshake />
                                </div>
                                <h3 className="step-title">Step 2: Attend</h3>
                                <p className="step-description">Attend the events you are interested in and enjoy the experience.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="step">
                                <div className="step-icon">
                                    <FaCheckCircle />
                                </div>
                                <h3 className="step-title">Step 3: Create</h3>
                                <p className="step-description">Create your own events and sell tickets to others.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* News and Updates Section */}
            <section className="news-section">
                <div className="container">
                    <h2 className="section-title">News and Updates</h2>
                    <div className="news-grid">
                        <div className="news-item">
                            <div className="news-image">
                                <img src="https://place-hold.it/400x200" alt="News 1" />
                            </div>
                            <div className="news-content">
                                <h3 className="news-title">New Feature Release</h3>
                                <div className="news-meta">
                                    <AiOutlineCalendar className="news-icon" />
                                    <span className="news-date">June 25, 2023</span>
                                </div>
                                <p className="news-description">
                                    We're excited to announce the release of our new feature that will enhance your experience on our platform.
                                </p>
                                <a href="#" className="news-link">Read More</a>
                            </div>
                        </div>
                        <div className="news-item">
                            <div className="news-image">
                                <img src="https://place-hold.it/400x200" alt="News 2" />
                            </div>
                            <div className="news-content">
                                <h3 className="news-title">Community Forum Launch</h3>
                                <div className="news-meta">
                                    <AiOutlineCalendar className="news-icon" />
                                    <span className="news-date">July 5, 2023</span>
                                </div>
                                <p className="news-description">
                                    Join our new community forum where you can connect with other users, share experiences, and get support.
                                </p>
                                <a href="#" className="news-link">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="newsletter-section">
                <div className="container">
                    <h2 className="section-title">Subscribe to Our Newsletter</h2>
                    <p className="section-description">Stay up to date with the latest news and updates.</p>
                    <form className="newsletter-form">
                        <div className="input-wrapper">
                            <input type="email" placeholder="Your email address" className="newsletter-input" />
                            <button type="submit" className="newsletter-button">
                                <FaEnvelope className="button-icon" />
                                Subscribe
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
