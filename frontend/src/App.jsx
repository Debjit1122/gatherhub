import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { UserProvider } from './UserContext';
import { AuthContextProvider } from './AuthContext'; // Add this import
import Home from './pages/Home';
import Events from './pages/Events';
import Profile from './pages/Profile';
import CreateEvent from './pages/CreateEvent';
import EventInfo from './pages/EventInfo';

function App() {
  return (
    <div>
      <AuthContextProvider> {/* Add AuthContextProvider */}
        {/* <UserProvider> */}
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/create-event" element={<CreateEvent />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/events/:eventId" element={<EventInfo />} />
            </Routes>
          </Router>
        {/* </UserProvider> */}
      </AuthContextProvider>
    </div>
  );
}

export default App;
