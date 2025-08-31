import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bio: '',
    interests: [],
    hobbies: [],
    location: {
      city: '',
      country: ''
    },
    profileImage: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view your profile');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setProfile(userData);
        setForm({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          dateOfBirth: userData.dateOfBirth ? userData.dateOfBirth.split('T')[0] : '',
          gender: userData.gender || '',
          bio: userData.bio || '',
          interests: userData.interests || [],
          hobbies: userData.hobbies || [],
          location: {
            city: userData.location?.city || '',
            country: userData.location?.country || ''
          },
          profileImage: userData.photos?.[0]?.url || ''
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch profile');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('location.')) {
      const locationField = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
    } else if (name === 'interests' || name === 'hobbies') {
      const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
      setForm(prev => ({ ...prev, [name]: arrayValue }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const updateData = {
        ...form,
        photos: form.profileImage ? [{ url: form.profileImage, isPrimary: true }] : []
      };

      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setProfile(updatedUser);
        setEditing(false);
        setSuccess('Profile updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update profile');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/profile/password', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });

      if (response.ok) {
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setChangingPassword(false);
        setSuccess('Password changed successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to change password');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-loading">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-container">
        <div className="profile-error">Failed to load profile. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        {error && <div className="profile-error">{error}</div>}
        {success && <div className="profile-success">{success}</div>}
        
        <div className="profile-content">
          <div className="profile-image-section">
            <img 
              src={profile.photos?.[0]?.url || '/default-avatar.png'} 
              alt={profile.name || 'Profile'} 
              className="profile-avatar" 
            />
          </div>

          {editing ? (
            <form onSubmit={handleSave} className="profile-form">
              <div className="form-group">
                <label>Name</label>
                <input 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  className="profile-input"
                  required 
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input 
                  name="email" 
                  type="email"
                  value={form.email} 
                  onChange={handleChange} 
                  className="profile-input"
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input 
                  name="phone" 
                  value={form.phone} 
                  onChange={handleChange} 
                  className="profile-input" 
                />
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input 
                  name="dateOfBirth" 
                  type="date"
                  value={form.dateOfBirth} 
                  onChange={handleChange} 
                  className="profile-input"
                  required 
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select 
                  name="gender" 
                  value={form.gender} 
                  onChange={handleChange} 
                  className="profile-input"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>City</label>
                <input 
                  name="location.city" 
                  value={form.location.city} 
                  onChange={handleChange} 
                  className="profile-input" 
                />
              </div>

              <div className="form-group">
                <label>Country</label>
                <input 
                  name="location.country" 
                  value={form.location.country} 
                  onChange={handleChange} 
                  className="profile-input" 
                />
              </div>

              <div className="form-group">
                <label>Interests (comma-separated)</label>
                <input 
                  name="interests" 
                  value={form.interests.join(', ')} 
                  onChange={handleChange} 
                  className="profile-input"
                  placeholder="e.g., reading, hiking, cooking" 
                />
              </div>

              <div className="form-group">
                <label>Hobbies (comma-separated)</label>
                <input 
                  name="hobbies" 
                  value={form.hobbies.join(', ')} 
                  onChange={handleChange} 
                  className="profile-input"
                  placeholder="e.g., photography, gaming, dancing" 
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea 
                  name="bio" 
                  value={form.bio} 
                  onChange={handleChange} 
                  className="profile-textarea"
                  maxLength="500"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="form-group">
                <label>Profile Image URL</label>
                <input 
                  name="profileImage" 
                  value={form.profileImage} 
                  onChange={handleChange} 
                  className="profile-input"
                  placeholder="https://example.com/image.jpg" 
                />
              </div>

              <div className="form-buttons">
                <button type="submit" className="profile-save-button">Save Changes</button>
                <button 
                  type="button" 
                  onClick={() => setEditing(false)} 
                  className="profile-cancel-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : changingPassword ? (
            <form onSubmit={handlePasswordSubmit} className="profile-form">
              <div className="form-group">
                <label>Current Password</label>
                <input 
                  name="currentPassword" 
                  type="password"
                  value={passwordForm.currentPassword} 
                  onChange={handlePasswordChange} 
                  className="profile-input"
                  required 
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input 
                  name="newPassword" 
                  type="password"
                  value={passwordForm.newPassword} 
                  onChange={handlePasswordChange} 
                  className="profile-input"
                  required 
                />
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <input 
                  name="confirmPassword" 
                  type="password"
                  value={passwordForm.confirmPassword} 
                  onChange={handlePasswordChange} 
                  className="profile-input"
                  required 
                />
              </div>

              <div className="form-buttons">
                <button type="submit" className="profile-save-button">Change Password</button>
                <button 
                  type="button" 
                  onClick={() => setChangingPassword(false)} 
                  className="profile-cancel-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-display">
              <h2 className="profile-name">{profile.name}, {profile.age}</h2>
              <p className="profile-email">{profile.email}</p>
              {profile.phone && <p className="profile-phone">{profile.phone}</p>}
              <p className="profile-location">
                {profile.location?.city && profile.location?.country 
                  ? `${profile.location.city}, ${profile.location.country}`
                  : profile.location?.city || profile.location?.country || 'Location not set'
                }
              </p>
              {profile.interests?.length > 0 && (
                <div className="profile-section">
                  <h4>Interests</h4>
                  <div className="profile-tags">
                    {profile.interests.map((interest, index) => (
                      <span key={index} className="profile-tag">{interest}</span>
                    ))}
                  </div>
                </div>
              )}
              {profile.hobbies?.length > 0 && (
                <div className="profile-section">
                  <h4>Hobbies</h4>
                  <div className="profile-tags">
                    {profile.hobbies.map((hobby, index) => (
                      <span key={index} className="profile-tag">{hobby}</span>
                    ))}
                  </div>
                </div>
              )}
              {profile.bio && (
                <div className="profile-section">
                  <h4>About Me</h4>
                  <p className="profile-bio">{profile.bio}</p>
                </div>
              )}
              
              <div className="profile-actions">
                <button onClick={() => setEditing(true)} className="profile-edit-button">
                  Edit Profile
                </button>
                <button onClick={() => setChangingPassword(true)} className="profile-password-button">
                  Change Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;