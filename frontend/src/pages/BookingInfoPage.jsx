import { useContext } from 'react';
import { UserContext } from '../UserContext';
import './BookingInfoPage.css';
import axios from 'axios'; // import axios

function BookingInfoPage() {
    const { userData } = useContext(UserContext);

    if (!userData) {
        return <div className="loader"></div>;
    }

    const handleConfirmBooking = async () => {
        const booking = {
            userId: userData._id,
            eventId: 'eventId', // replace with actual event ID
            tickets: 'tickets', // replace with actual ticket quantity
            totalPrice: 'totalPrice', // replace with actual total price
            paymentMethod: 'paymentMethod' // replace with actual payment method
        };

        try {
            const response = await axios.post('http://localhost:5000/api/bookings', booking);
            if (response.data.success) {
                console.log('Booking confirmed');
            } else {
                console.log('Error confirming booking', response.data.error);
            }
        } catch (error) {
            console.log('Error confirming booking', error);
        }
    };

    return (
        <div className="booking-info">
            <div className="grid-container">
                <div className="user-info">
                    <h2>User Profile</h2>
                    <div className="avatar"></div>
                    <p>{userData.name}</p>
                    <p>{userData.email}</p>
                    <p>{userData.location}</p>
                </div>
            </div>

            <button className="confirm-booking" onClick={handleConfirmBooking}>Confirm Booking</button>
        </div>
    );
}

export default BookingInfoPage;
