import { useEffect, useState } from 'react';
import './Events.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BsFillGridFill } from 'react-icons/bs';
import FooterComponent from '../components/FooterComponent';
import NavBarComponent from '../components/NavbarComponent';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Events = () => {
    const [eventData, setEventData] = useState([]);
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await axios.get('https://gatherhub-backend.vercel.app/events'); // Replace '/api/events' with the actual API endpoint for fetching event data
                setEventData(response.data.events); // Assuming the response data has an 'events' property that contains an array of event objects
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchEventData();
    }, []);

    return (
        <div className="events-page">
            <NavBarComponent />
            <header className="hero-section">
                <div className="hero-content">
                    <h1>Discover Exciting Events</h1>
                    <p>Find and attend the latest events in your area</p>
                </div>
            </header>

            <main className="main-content">
                <div className="sidebar">
                    <div className="search-bar">
                        <input type="text" placeholder="Search..." />
                        <select>
                            <option value="">Category</option>
                            <option value="music">Music</option>
                            <option value="art">Art</option>
                            <option value="sports">Sports</option>
                        </select>
                        <input type="date" />
                        <button type="button">Search</button>
                    </div>
                </div>

                <div className="event-cards">
                    {eventData.map((event) => (
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
                                            {new Date(event.startDate).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}{' '}
                                            -{' '}
                                            {new Date(event.endDate).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </p>
                                ) : (
                                    <p className="text-muted">
                                        <AiOutlineCalendar />
                                        <span>
                                            {new Date(event.startDate).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}{' '}
                                            ({event.timeSlots[0].startTime} - {event.timeSlots[0].endTime})
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
                    ))}
                </div>
            </main>
            <FooterComponent />
        </div>
    );
};

export default Events;
