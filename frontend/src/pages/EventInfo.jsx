import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CiLocationOn } from 'react-icons/ci'
import './EventInfo.css';
import NavBarComponent from '../components/NavbarComponent';
import FooterComponent from '../components/FooterComponent';

const EventInfoPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [ticketCount, setTicketCount] = useState(1);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/events/${eventId}`);
                setEvent(response.data.event);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchEvent();
    }, [eventId]);

    if (!event) {
        return <p>Loading event information...</p>;
    }

    const handleTicketCountChange = (e) => {
        setTicketCount(parseInt(e.target.value));
    };

    const handleBookTickets = () => {
        console.log(`Booked ${ticketCount} tickets for event: ${event.name}`);
    };

    const { name, description, detailedInfo, venue, category, isChoosingDateRange, startDate, endDate, timeSlots, selectedTimezone, selectedCurrency, price, salePrice, discountCoupon, tickets } = event;

    // Format the start date and end date
    const formattedStartDate = startDate
        ? new Date(startDate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            timeZone: selectedTimezone.value,
        })
        : '';
    const formattedEndDate = endDate
        ? new Date(endDate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            timeZone: selectedTimezone.value,
        })
        : '';

    // Format the time slots
    const formattedTimeSlots = timeSlots.map((slot) => {
        const formattedStartTime = new Date(
            new Date(slot.date).setHours(
                parseInt(slot.startTime.split(':')[0]),
                parseInt(slot.startTime.split(':')[1])
            )
        ).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            timeZone: selectedTimezone.value,
        });

        const formattedEndTime = new Date(
            new Date(slot.date).setHours(
                parseInt(slot.endTime.split(':')[0]),
                parseInt(slot.endTime.split(':')[1])
            )
        ).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            timeZone: selectedTimezone.value,
        });

        const formattedDate = new Date(slot.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            timeZone: selectedTimezone.value,
        });

        return `${formattedDate}, ${formattedStartTime} - ${formattedEndTime}`;
    });

    // Format the prices
    const formattedPrice = selectedCurrency ? new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedCurrency.value }).format(price) : '';
    const formattedSalePrice = selectedCurrency ? new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedCurrency.value }).format(salePrice) : '';

    return (
        <div>
            <NavBarComponent />
            {/* Hero section */}
            <section className="hero-section text-white text-center py-5" style={{ backgroundImage: 'linear-gradient(to right, #9E9E9E, #757575, #616161, #424242)', backgroundSize: 'cover' }}>
                <h1 className="display-4">{name}</h1>
                <p className="lead">{description}</p>
            </section>
            <Container fluid className="event-info-page p-5">
                <Row>
                    <Col md={8}>
                        {/* Detailed Info section */}
                        <section className="details-section mt-5">
                            <div className="category-tag">{category}</div>
                            <div className="detailed-info">{detailedInfo}</div>
                        </section>
                        <section className="when-section mt-5">
                            <h2 className="mb-4">When</h2>
                            {isChoosingDateRange ? (
                                <>
                                    <p>{formattedStartDate} - {formattedEndDate} (Timezone: {selectedTimezone.label})</p>
                                </>
                            ) : (
                                <ul>
                                    {formattedTimeSlots.map((timeSlot, index) => (
                                        <li key={index}>{timeSlot} (Timezone: {selectedTimezone.label})</li>
                                    ))}
                                </ul>
                            )}
                        </section>

                        {/* Gallery section */}
                        <section className="gallery-section mt-5">
                            <h2 className="mb-5 text-center">Gallery</h2>
                            <Row>
                                <Col md={6}>
                                    <Card className="mb-4">
                                        <Card.Img variant="top" src="https://place-hold.it/500x300" />
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <Card className="mb-4">
                                        <Card.Img variant="top" src="https://place-hold.it/500x300" />
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <Card className="mb-4">
                                        <Card.Img variant="top" src="https://place-hold.it/500x300" />
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <Card className="mb-4">
                                        <Card.Img variant="top" src="https://place-hold.it/500x300" />
                                    </Card>
                                </Col>
                            </Row>
                        </section>
                    </Col>
                    <Col md={4}>
                        {/* Book Tickets section */}
                        <section className="booking-section mt-5">
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title>Book Tickets</Card.Title>
                                    <input className="form-control mb-3" type="number" value={ticketCount} onChange={handleTicketCountChange} min="1" />
                                    <div className="price-section">
                                        {salePrice ? (
                                            <>
                                                <span className="price"><del>{formattedPrice}</del></span>
                                                <span className="sale-price mx-2">{formattedSalePrice}</span>
                                            </>
                                        ) : (
                                            <span className="price">{formattedPrice}</span>
                                        )}
                                    </div>
                                    <Button id="book-btn" className="mt-3" onClick={handleBookTickets}>Book Now</Button>
                                </Card.Body>
                            </Card>
                        </section>
                        {/* Where section */}
                        <section className="where-section mt-5">
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title className='d-flex gap-1'>
                                        <span className='text-black fw-500'>Where</span>
                                        <CiLocationOn />
                                    </Card.Title>
                                    <Card.Text>{venue}</Card.Text>
                                </Card.Body>
                            </Card>
                        </section>
                    </Col>
                </Row>
            </Container>
            <FooterComponent />
        </div>
    );
};

export default EventInfoPage;
