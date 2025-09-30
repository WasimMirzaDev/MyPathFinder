// ProfilePage.jsx
import React, { useState } from 'react';
import './ProfilePage2.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [userData, setUserData] = useState({
    firstName: 'Johnathan',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    birthDate: '1990-01-15',
    bio: "I'm a passionate software developer with over 10 years of experience in web technologies. I love creating user-friendly applications that solve real-world problems."
  });
  const [settings, setSettings] = useState({
    language: 'English',
    timezone: 'Eastern Time (ET)',
    theme: 'Light',
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSettingsChange = (name, value) => {
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e, formType) => {
    e.preventDefault();
    if (formType === 'profile') {
      console.log('Updating profile:', userData);
      alert('Profile updated successfully!');
    } else if (formType === 'password') {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert('New passwords do not match!');
        return;
      }
      console.log('Changing password');
      alert('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else if (formType === 'settings') {
      console.log('Updating settings:', settings);
      alert('Settings updated successfully!');
    }
  };

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <ProfileHeader userData={userData} />
      
      <div className="container">
        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'personal' && (
            <PersonalInfoTab userData={userData} />
          )}
          
          {activeTab === 'settings' && (
            <SettingsTab 
              settings={settings} 
              onSettingsChange={handleSettingsChange}
              onSubmit={(e) => handleSubmit(e, 'settings')}
            />
          )}
          
          {activeTab === 'subscription' && (
            <SubscriptionTab />
          )}
          
          {activeTab === 'edit' && (
            <EditProfileTab 
              userData={userData}
              passwordData={passwordData}
              onInputChange={handleInputChange}
              onPasswordChange={handlePasswordChange}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    
    </div>
  );
};

// Profile Header Component
const ProfileHeader = ({ userData }) => (
  <div className="profile-header">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <div className="profile-image-container">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
              alt="Profile" 
              className="profile-image" 
            />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{userData.firstName} {userData.lastName}</h1>
            <p className="profile-email">{userData.email}</p>
            {/* <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-value">245</div>
                <div className="stat-label">Followers</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">128</div>
                <div className="stat-label">Following</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">42</div>
                <div className="stat-label">Posts</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Tab Navigation Component
const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'fa-user-circle' },
    { id: 'settings', label: 'Settings', icon: 'fa-cog' },
    { id: 'subscription', label: 'Subscription', icon: 'fa-credit-card' },
    { id: 'edit', label: 'Edit Profile', icon: 'fa-edit' }
  ];

  return (
    <ul className="nav nav-tabs" role="tablist">
      {tabs.map(tab => (
        <li key={tab.id} className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            type="button"
          >
            <i className={`fas ${tab.icon}`}></i> {tab.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

// #BA67EF

const userIcon = (<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#BA67EF"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-user-square-rounded"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 13a3 3 0 1 0 0 -6a3 3 0 0 0 0 6z" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /><path d="M6 20.05v-.05a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v.05" /></svg>)
const emailIcon = (<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#BA67EF"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>)
const phoneIcon = (<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#BA67EF"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-phone"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>)
const BDIcon = (<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#BA67EF"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-cake"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 20h18v-8a3 3 0 0 0 -3 -3h-12a3 3 0 0 0 -3 3v8z" /><path d="M3 14.803c.312 .135 .654 .204 1 .197a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1c.35 .007 .692 -.062 1 -.197" /><path d="M12 4l1.465 1.638a2 2 0 1 1 -3.015 .099l1.55 -1.737z" /></svg>);
const addressIcon = (<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#BA67EF"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" /></svg>);
const memberIcon = (<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#BA67EF"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-week"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg>);

// Personal Info Tab Component
const PersonalInfoTab = ({ userData }) => (
  <div className="tab-pane active">
    <h3 className="section-title"><i className="fas fa-user"></i> Personal Information</h3>
    <div className="row">
      <div className="col-md-6">
        <InfoItem icon={userIcon} label="Full Name" value={`${userData.firstName} ${userData.lastName}`} />
        <InfoItem icon={emailIcon} label="Email" value={userData.email} />
        <InfoItem icon={phoneIcon} label="Phone" value={userData.phone} />
      </div>
      <div className="col-md-6">
        <InfoItem icon={BDIcon} label="Date of Birth" value="January 15, 1990" />
        <InfoItem icon={addressIcon} label="Address" value={userData.address} />
        <InfoItem icon={memberIcon} label="Member Since" value="March 2020" />
      </div>
    </div>
    
    <div className="mt-5">
      <h3 className="section-title"><i className="fas fa-chart-bar"></i> Activity Overview</h3>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Profile Completion</h5>
              <div className="progress">
                <div className="progress-bar" style={{ width: '85%' }}></div>
              </div>
              <p className="card-text">Your profile is 85% complete. Add more information to get better recommendations.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Account Status</h5>
              <p className="card-text"><span className="badge bg-primary">Verified</span> Your account is fully verified and active.</p>
              <p className="card-text"><span className="badge bg-primary">Premium</span> You are on a premium subscription plan.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Info Item Component
const InfoItem = ({ icon, label, value }) => (
  <div className="info-item">
    <div className="info-icon">
      {icon}
    </div>
    <div>
      <div className="info-label">{label}</div>
      <div className="info-value">{value}</div>
    </div>
  </div>
);

// Settings Tab Component
const SettingsTab = ({ settings, onSettingsChange, onSubmit }) => (
  <div className="tab-pane">
    <h3 className="section-title"><i className="fas fa-cog"></i> Account Settings</h3>
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-4">
            <label className="form-label">Language</label>
            <select 
              className="form-select"
              value={settings.language}
              onChange={(e) => onSettingsChange('language', e.target.value)}
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="form-label">Time Zone</label>
            <select 
              className="form-select"
              value={settings.timezone}
              onChange={(e) => onSettingsChange('timezone', e.target.value)}
            >
              <option>Eastern Time (ET)</option>
              <option>Central Time (CT)</option>
              <option>Mountain Time (MT)</option>
              <option>Pacific Time (PT)</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="form-label">Theme</label>
            <select 
              className="form-select"
              value={settings.theme}
              onChange={(e) => onSettingsChange('theme', e.target.value)}
            >
              <option>Light</option>
              <option>Dark</option>
              <option>Auto</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <h5 className="mb-3">Notification Preferences</h5>
          <ToggleSetting
            label="Email Notifications"
            description="Receive updates via email"
            checked={settings.emailNotifications}
            onChange={(checked) => onSettingsChange('emailNotifications', checked)}
          />
          <ToggleSetting
            label="Push Notifications"
            description="Receive browser notifications"
            checked={settings.pushNotifications}
            onChange={(checked) => onSettingsChange('pushNotifications', checked)}
          />
          <ToggleSetting
            label="SMS Notifications"
            description="Receive text messages"
            checked={settings.smsNotifications}
            onChange={(checked) => onSettingsChange('smsNotifications', checked)}
          />
          <ToggleSetting
            label="Marketing Emails"
            description="Receive promotional content"
            checked={settings.marketingEmails}
            onChange={(checked) => onSettingsChange('marketingEmails', checked)}
          />
        </div>
      </div>
      <div className="mt-4">
        <button type="submit" className="btn btn-primary">Save Settings</button>
      </div>
    </form>
  </div>
);

// Toggle Setting Component
const ToggleSetting = ({ label, description, checked, onChange }) => (
  <div className="settings-option">
    <div>
      <div className="fw-bold">{label}</div>
      <div className="text-muted small">{description}</div>
    </div>
    <label className="toggle-switch">
      <input 
        type="checkbox" 
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="slider"></span>
    </label>
  </div>
);

// Subscription Tab Component
const SubscriptionTab = () => (
  <div className="tab-pane">
    <h3 className="section-title"><i className="fas fa-credit-card"></i> Subscription Details</h3>
    <div className="row">
      <div className="col-lg-8">
        <SubscriptionCard
          title="Premium Plan"
          price="$19.99"
          period="/month"
          badge="Active"
          badgeType="premium"
          features={[
            "Unlimited access to all premium features",
            "Priority customer support",
            "Advanced analytics and reports",
            "Custom branding options",
            "Early access to new features"
          ]}
          renewDate="March 15, 2023"
          primaryAction="Upgrade Plan"
          secondaryAction="Cancel Subscription"
        />
        
        <SubscriptionCard
          title="Basic Plan"
          price="$9.99"
          period="/month"
          features={[
            "Access to basic features",
            "Standard customer support",
            "Basic analytics",
            "Limited customization"
          ]}
          primaryAction="Downgrade to Basic"
        />
      </div>
      <div className="col-lg-4">
        <BillingHistory />
        <PaymentMethod />
      </div>
    </div>
  </div>
);

// Subscription Card Component
const SubscriptionCard = ({ 
  title, 
  price, 
  period, 
  badge, 
  badgeType, 
  features, 
  renewDate, 
  primaryAction, 
  secondaryAction 
  }) => (
  <div className={`subscription-card premium`}>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div>
        <span className="subscription-title">{title}</span>
        {badge && <span className={`badge-${badgeType} ms-2`}>{badge}</span>}
      </div>
      <div className="subscription-price">{price}<span className="text-muted" style={{ fontSize: '1rem' }}>{period}</span></div>
    </div>
    {renewDate && <p className="text-muted">Your subscription will renew on <strong>{renewDate}</strong></p>}
    <ul className="subscription-features">
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
    <div className="mt-4">
      <button className="btn btn-primary me-2">{primaryAction}</button>
      {secondaryAction && <button className="btn btn-outline-secondary">{secondaryAction}</button>}
    </div>
  </div>
);

// Billing History Component
const BillingHistory = () => {
  const billingHistory = [
    { date: 'February 15, 2023', amount: '$19.99' },
    { date: 'January 15, 2023', amount: '$19.99' },
    { date: 'December 15, 2022', amount: '$19.99' },
    { date: 'November 15, 2022', amount: '$19.99' }
  ];

  return (
    <div className="card">
      <div className="card-header">Billing History</div>
      <div className="card-body">
        {billingHistory.map((item, index) => (
          <div key={index} className="d-flex justify-content-between border-bottom py-3">
            <div>{item.date}</div>
            <div className="fw-bold">{item.amount}</div>
          </div>
        ))}
        <div className="mt-3 text-center">
          <a href="#" className="text-primary">View Full History</a>
        </div>
      </div>
    </div>
  );
};

// Payment Method Component
const PaymentMethod = () => (
  <div className="card mt-4">
    <div className="card-header">Payment Method</div>
    <div className="card-body">
      <div className="d-flex align-items-center">
        <i className="fab fa-cc-visa fa-2x text-primary me-3"></i>
        <div>
          <div className="fw-bold">Visa ending in 4567</div>
          <div className="text-muted small">Expires 05/2024</div>
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-outline-primary btn-sm">Update Payment Method</button>
      </div>
    </div>
  </div>
);

// Edit Profile Tab Component
const EditProfileTab = ({ userData, passwordData, onInputChange, onPasswordChange, onSubmit }) => (
  <div className="tab-pane">
    {/* Edit User Details Form */}
    <div className="form-section">
      <h3 className="section-title"><i className="fas fa-user-edit"></i> Edit Personal Information</h3>
      <form onSubmit={(e) => onSubmit(e, 'profile')}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={onInputChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={userData.lastName}
                onChange={onInputChange}
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userData.email}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            rows="3"
            value={userData.address}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            id="birthDate"
            name="birthDate"
            value={userData.birthDate}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="form-label">Bio</label>
          <textarea
            className="form-control"
            id="bio"
            name="bio"
            rows="4"
            placeholder="Tell us about yourself"
            value={userData.bio}
            onChange={onInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>

    {/* Change Password Form */}
    <div className="form-section">
      <h3 className="section-title"><i className="fas fa-lock"></i> Change Password</h3>
      <form onSubmit={(e) => onSubmit(e, 'password')}>
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label">Current Password</label>
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={onPasswordChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={onPasswordChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={onPasswordChange}
          />
        </div>
        <div className="mb-3">
          <div className="form-text">
            Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Change Password</button>
      </form>
    </div>
  </div>
);

export default ProfilePage;