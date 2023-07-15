import { useContext } from 'react';
import './Profile.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
import { UserContext } from '../UserContext';
import { FaArrowLeft } from 'react-icons/fa';
const Profile = () => {
    const { userData } = useContext(UserContext);
    // If userData is null or undefined, show a loading message
    if (!userData) {
        return <div>Loading...</div>;
    }
    const pastEventsData = [
        {
            id: 1,
            title: 'Event 1',
            date: 'January 1, 2023',
            category: 'Music',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: 'https://place-hold.it/300x500',
        },
        {
            id: 2,
            title: 'Event 1',
            date: 'January 1, 2023',
            category: 'Music',
            description: 'lorem ipsum dolor sit amet, consectetur adipiscing',
            image: 'https://place-hold.it/300x500',
        },
        {
            id: 3,
            title: 'Event 1',
            date: 'January 1, 2023',
            category: 'Music',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: 'https://place-hold.it/300x500',
        },
        {
            id: 4,
            title: 'Event 1',
            date: 'January 1, 2023',
            category: 'Music',
            description: 'lorem ipsum dolor sit amet, consectet',
            image: 'https://place-hold.it/300x500',
        },
        // Add more event objects
    ];

    return (
        <div id="profile-page">
            <a href="/" className="back-arrow"><FaArrowLeft size={30} /></a>
            <div className="profile-container">
                <section className="h-100">
                    <div className="container-fluid py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-9 col-xl-7">
                                <div className="card profile-card">
                                    <div className="rounded-top text-white d-flex flex-row profile-top">
                                        <div className="ms-4 mt-5 d-flex flex-column profile-img">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2" />
                                            <button type="button" className="profile-btn" data-mdb-ripple-color="dark">
                                                Edit profile
                                            </button>
                                        </div>
                                        <div className="ms-3 profile-info">
                                            <h2 className='fw-bold'>{userData.name}</h2>
                                            <p>{userData.bio}</p>
                                            <p><CiLocationOn /> {userData.location}</p>
                                        </div>
                                    </div>
                                    <div className="p-4 profile-content">
                                        <div className="d-flex justify-content-end text-center py-1">
                                            <div>
                                                <p className="mb-1 h5">8</p>
                                                <p className="small text-muted mb-0">Attended</p>
                                            </div>
                                            <div className="px-3">
                                                <p className="mb-1 h5">4</p>
                                                <p className="small text-muted mb-0">Created</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-5 p-5 flex-wrap">
                                        <div className="col-md-6">
                                            <h4 className='mb-4'>Interests</h4>
                                            <div className='d-flex flex-wrap align-items-center gap-4'>
                                                {userData.interests.map((interest, index) => (
                                                    <div key={index} className="interest-cards">
                                                        <span>{interest}</span>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>

                                        <div className="card profile-info-cards col-md-5">
                                            <div className="card-body">
                                                <div>
                                                    <span>Email</span>
                                                    <p>{userData.email}</p>
                                                </div>
                                                <div>
                                                    <span>Phone</span>
                                                    <p>{userData.phone}</p>
                                                </div>
                                                <div>
                                                    <span>Company</span>
                                                    <p>{userData.company}</p>
                                                </div>
                                                <div>
                                                    <span>Department</span>
                                                    <p>{userData.department}</p>
                                                </div>
                                                <div>
                                                    <span>Job Role</span>
                                                    <p>{userData.jobRole}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="past-events">
                                            <div className="card-body">
                                                <h4 className="card-title text-center mb-5">Past Events</h4>
                                                <div className="past-events-card">
                                                    {pastEventsData.map((card) => (
                                                        <div className="info-card" key={card.id}>
                                                            <img className="info-card-image card-img-top" src={card.image} alt={card.title} />
                                                            <div className="info-card-body">
                                                                <h5 className="info-card-title card-title">{card.title}</h5>
                                                                <p className='info-card-text'><AiOutlineCalendar /> {card.date}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Profile;
