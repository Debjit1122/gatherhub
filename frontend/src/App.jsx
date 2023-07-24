import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext'; // Add this import
import Home from './pages/Home';
import Events from './pages/Events';
import Profile from './pages/Profile';
import CreateEvent from './pages/CreateEvent';
import EventInfo from './pages/EventInfo';
import BookingInfoPage from './pages/BookingInfoPage';

function App() {
  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/events/:eventId" element={<EventInfo />} />
            <Route path="/book" element={<BookingInfoPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
