import React, { useState } from 'react';

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
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #fff1f7 0%, #ffe3e3 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{background: '#fff', borderRadius: '2rem', boxShadow: '0 8px 32px rgba(233,64,87,0.10)', padding: '2.5rem 2rem', minWidth: 340, maxWidth: 400, width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <img src={profile.photo} alt={profile.name} style={{width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: '1.2rem', border: '3px solid #e94057'}} />
          {editing ? (
            <form onSubmit={handleSave} style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <input name="name" value={form.name} onChange={handleChange} style={{padding: '0.8rem 1rem', borderRadius: '1rem', border: '1px solid #eee', fontSize: '1rem'}} />
              <input name="age" value={form.age} onChange={handleChange} style={{padding: '0.8rem 1rem', borderRadius: '1rem', border: '1px solid #eee', fontSize: '1rem'}} />
              <input name="location" value={form.location} onChange={handleChange} style={{padding: '0.8rem 1rem', borderRadius: '1rem', border: '1px solid #eee', fontSize: '1rem'}} />
              <textarea name="bio" value={form.bio} onChange={handleChange} style={{padding: '0.8rem 1rem', borderRadius: '1rem', border: '1px solid #eee', fontSize: '1rem', minHeight: 60}} />
              <button type="submit" style={{background: 'linear-gradient(90deg, #e94057 0%, #ff6a88 100%)', color: '#fff', border: 'none', borderRadius: '1rem', padding: '1rem', fontWeight: 700, fontSize: '1.1rem', marginTop: '0.5rem', cursor: 'pointer'}}>Save</button>
            </form>
          ) : (
            <>
              <h2 style={{color: '#e94057', margin: 0}}>{profile.name}, {profile.age}</h2>
              <p style={{color: '#888', margin: '0.2rem 0 0.8rem 0'}}>{profile.location}</p>
              <p style={{fontSize: '1.05rem', color: '#333', textAlign: 'center'}}>{profile.bio}</p>
              <button onClick={() => setEditing(true)} style={{background: 'linear-gradient(90deg, #e94057 0%, #ff6a88 100%)', color: '#fff', border: 'none', borderRadius: '1rem', padding: '0.8rem 1.5rem', fontWeight: 700, fontSize: '1rem', marginTop: '1.2rem', cursor: 'pointer'}}>Edit Profile</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile; 