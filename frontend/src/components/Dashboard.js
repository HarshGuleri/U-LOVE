import React from 'react';

const user = {
  name: 'Alexandra',
  age: 26,
  location: 'New York',
  photo: 'https://randomuser.me/api/portraits/women/44.jpg',
  bio: 'Loves art, travel, and good coffee. Looking for someone to share adventures with!'
};

const matches = [
  { name: 'Chris', photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Taylor', photo: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { name: 'Jordan', photo: 'https://randomuser.me/api/portraits/men/76.jpg' },
];

function Dashboard() {
  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #fff1f7 0%, #ffe3e3 100%)', padding: '2rem 0'}}>
      <div style={{maxWidth: 900, margin: '0 auto', display: 'flex', gap: '2.5rem', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap'}}>
        {/* Profile Card */}
        <div style={{background: '#fff', borderRadius: '2rem', boxShadow: '0 8px 32px rgba(233,64,87,0.10)', padding: '2rem', minWidth: 320, maxWidth: 340, flex: 1}}>
          <img src={user.photo} alt={user.name} style={{width: '100%', borderRadius: '1.5rem', marginBottom: '1.2rem'}} />
          <h2 style={{color: '#e94057', margin: 0}}>{user.name}, {user.age}</h2>
          <p style={{color: '#888', margin: '0.2rem 0 0.8rem 0'}}>{user.location}</p>
          <p style={{fontSize: '1.05rem', color: '#333'}}>{user.bio}</p>
        </div>
        {/* Swipe UI */}
        <div style={{flex: 2, minWidth: 340, maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{background: '#fff', borderRadius: '2rem', boxShadow: '0 8px 32px rgba(233,64,87,0.10)', padding: '2rem', width: '100%', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Swipe Profile" style={{width: '100%', borderRadius: '1.5rem', marginBottom: '1.2rem'}} />
            <h3 style={{color: '#e94057', margin: 0}}>Samantha, 24</h3>
            <p style={{color: '#888', margin: '0.2rem 0 1rem 0'}}>San Francisco</p>
            <div style={{display: 'flex', gap: '2rem', justifyContent: 'center'}}>
              <button style={{background: '#fff', border: '2px solid #e94057', color: '#e94057', borderRadius: '50%', width: 56, height: 56, fontSize: 28, cursor: 'pointer', boxShadow: '0 2px 8px rgba(233,64,87,0.08)'}}>✖️</button>
              <button style={{background: 'linear-gradient(90deg, #e94057 0%, #ff6a88 100%)', border: 'none', color: '#fff', borderRadius: '50%', width: 56, height: 56, fontSize: 28, cursor: 'pointer', boxShadow: '0 2px 8px rgba(233,64,87,0.08)'}}>❤️</button>
            </div>
          </div>
          {/* Matches List */}
          <div style={{background: '#fff', borderRadius: '2rem', boxShadow: '0 8px 32px rgba(233,64,87,0.10)', padding: '1.5rem', width: '100%'}}>
            <h4 style={{color: '#e94057', marginBottom: '1rem'}}>Your Matches</h4>
            <div style={{display: 'flex', gap: '1.2rem'}}>
              {matches.map((m, i) => (
                <div key={i} style={{textAlign: 'center'}}>
                  <img src={m.photo} alt={m.name} style={{width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', marginBottom: 6, border: '2px solid #e94057'}} />
                  <div style={{fontSize: '0.95rem', color: '#333'}}>{m.name}</div>
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