import React, { useState } from 'react';
import './ProfilePage.css';

import bgImage from '../../assets/images/breadcrumBg.avif'


const ProfilePage = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Frontend Developer passionate about creating beautiful user interfaces with React.',
    location: 'New York, USA',
    joinDate: 'January 2023',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    coverImage: bgImage
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="profile-container container p-0 mb-4">
      <div className="profile-header ">
        <div
          className="cover-image breadcrum-bg-image"
          style={{ backgroundImage: `url(${user.coverImage})` }}
        />

        <div className="profile-info">
          <div className="avatar-section">
            <img src={user.avatar} alt="Profile" className="avatarProfile" />
            <button
              className={`btn ${isEditing ? 'btn-secondary' : 'btn-primary'}`}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="user-details">
            {isEditing ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                  className="form-control"
                />
                <textarea
                  value={editedUser.bio}
                  onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                  className="form-control"
                  rows="3"
                />
                <input
                  type="text"
                  value={editedUser.location}
                  onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
                  className="form-control"
                />
                <div className="edit-actions">
                  <button className="btn btn-primary" onClick={handleSave}>Save</button>
                  <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="user-name">{user.name}</h1>
                <p className="user-bio">{user.bio}</p>
                <div className="user-meta">
                  <span className="location">📍 {user.location}</span>
                  <span className="join-date">Joined {user.joinDate}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="stats-section">
          <div className="stat">
            <span className="stat-number">124</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat">
            <span className="stat-number">1.2K</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat">
            <span className="stat-number">456</span>
            <span className="stat-label">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;