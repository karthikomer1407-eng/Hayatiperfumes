
import React, { useState } from 'react';

const ADMIN_SESSION_KEY = 'hayati_admin_authorized';

// Change these credentials to your own.
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'hayati123';

export const isSessionAuthorized = () => {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
};

export const revokeAdminSession = () => {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
};

export const AdminAuthModal = ({
  isOpen,
  onClose,
  onAuthenticated
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (
      username === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');

      setUsername('');
      setPassword('');

      onAuthenticated();
    } else {
      setError('Invalid admin credentials.');
    }
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <div className="admin-auth-overlay">
      <div className="admin-auth-modal">
        <button
          type="button"
          className="admin-auth-close"
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="admin-auth-header">
          <span className="admin-auth-label">HAYATI</span>
          <h2>Admin Portal</h2>
          <p>Authorized access only.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-auth-field">
            <label htmlFor="admin-username">
              Username
            </label>

            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              required
            />
          </div>

          <div className="admin-auth-field">
            <label htmlFor="admin-password">
              Password
            </label>

            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <div className="admin-auth-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-auth-submit"
          >
            Enter Admin Portal
          </button>
        </form>
      </div>
    </div>
  );
};

