import { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
import { FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from '../AuthContext';

const Profile = () => {
    const { isLoggedIn, userData } = useContext(AuthContext);

    if (!isLoggedIn) {
        return <div>Please log in to view your profile.</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

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
