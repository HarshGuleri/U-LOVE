import React, { useState } from 'react';
import './Profile.css';

const initialProfile = {
  name: 'Alexandra',
  age: 26,
  location: 'New York',
  photo: 'https://randomuser.me/api/portraits/women/44.jpg',
  bio: 'Loves art, travel, and good coffee. Looking for someone to share adventures with!'
};

function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = e => {
    e.preventDefault();
    setProfile(form);
    setEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-content">
          <img src={profile.photo} alt={profile.name} className="profile-avatar" />
          {editing ? (
            <form onSubmit={handleSave} className="profile-form">
              <input name="name" value={form.name} onChange={handleChange} className="profile-input" />
              <input name="age" value={form.age} onChange={handleChange} className="profile-input" />
              <input name="location" value={form.location} onChange={handleChange} className="profile-input" />
              <textarea name="bio" value={form.bio} onChange={handleChange} className="profile-textarea" />
              <button type="submit" className="profile-save-button">Save</button>
            </form>
          ) : (
            <>
              <h2 className="profile-name">{profile.name}, {profile.age}</h2>
              <p className="profile-location">{profile.location}</p>
              <p className="profile-bio">{profile.bio}</p>
              <button onClick={() => setEditing(true)} className="profile-edit-button">Edit Profile</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;