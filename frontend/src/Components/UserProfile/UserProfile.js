import React from 'react';
import './userProfile.css';

const UserProfile = () => {
    const toggleInfo = (e) => {
        e.target.parentNode.classList.toggle('open');
    };

    return (
        <div className="userProfile">
            <div className="profile_card user_profile_image">
                <div className="profile_image">
                    <img src="./logo192.png" alt="profile_image" />
                </div>
                <h4>gg wp ez noobs</h4>
                <p>CEO & Founder at Highly Inc</p>
            </div>
            <div className="profile_card">
                <div className="card_header" onClick={toggleInfo}>
                    <h4>Information</h4>
                    <i className="fa fa-angle-down"></i>
                </div>
                <div className="card_content">League is a fun game where every game is jungle gap</div>
            </div>
        </div>
    );
};

export default UserProfile;
