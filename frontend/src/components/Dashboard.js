import React from "react";
import './Dashboard.css';

const user = {
  name: "Alexandra",
  age: 26,
  location: "New York",
  photo: "https://randomuser.me/api/portraits/women/44.jpg",
  bio: "Loves art, travel, and good coffee. Looking for someone to share adventures with!",
};

const matches = [
  { name: "Chris", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Taylor", photo: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Jordan", photo: "https://randomuser.me/api/portraits/men/76.jpg" },
];

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        {/* Profile Card */}
        <div className="profile-card">
          <img
            src={user.photo}
            alt={user.name}
            className="profile-image"
          />
          <h2 className="profile-name">
            {user.name}, {user.age}
          </h2>
          <p className="profile-location">
            {user.location}
          </p>
          <p className="profile-bio">
            {user.bio}
          </p>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Swipe Card */}
          <div className="swipe-card">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="Swipe Profile"
              className="swipe-image"
            />
            <h3 className="swipe-name">
              Samantha, 24
            </h3>
            <p className="swipe-location">
              San Francisco
            </p>
            <div className="swipe-buttons">
              <button className="reject-button">
                ✖
              </button>
              <button className="like-button">
                ♥
              </button>
            </div>
          </div>

          {/* Matches */}
          <div className="matches-card">
            <h4 className="matches-title">
              Your Matches
            </h4>
            <div className="matches-container">
              {matches.map((m, i) => (
                <div key={i} className="match-item">
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="match-image"
                  />
                  <div className="match-name">
                    {m.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
