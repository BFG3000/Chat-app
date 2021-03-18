import React from 'react';
import './avatar.css'
const Avatar = ({ image, isOnline }) => {
    return (
        <div className="avatar">
            <div className="avatar-img">
                <img src={image} alt="Not found" />
            </div>
            <span className={`isOnline ${isOnline}`}></span>
        </div>
    );
};

export default Avatar;
