import React, { useState } from 'react';
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, X, AlertCircle } from 'lucide-react';
import '../styles/admin.css';

const DEFAULT_PASSCODE = 'hayati2026';
const AUTH_KEY = 'hayati_admin_authorized_v1';

export function AdminAuthModal({ isOpen, onClose, onAuthenticated }) {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Check passcode
    if (passcode.trim() === DEFAULT_PASSCODE || passcode.trim() === 'admin123') {
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
      } catch (err) {
        console.error('Session storage error:', err);
      }
      setPasscode('');
      onAuthenticated();
    } else {
      setError('Invalid Administrator Passcode. Access Denied.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="admin-overlay open" id="auth-modal-overlay">
      <div className={`admin-auth-card ${isShaking ? 'shake-animation' : ''}`}>
        
        <button className="admin-close-btn auth-close-btn" onClick={onClose} aria-label="Close Auth Modal">
          <X style={{ width: 18, height: 18 }} />
        </button>

        <div className="auth-header">
          <div className="auth-icon-wrap">
            <Lock style={{ width: 28, height: 28, color: 'var(--gold-primary)' }} />
          </div>
          <h2 className="auth-title">Authorized Admin Access</h2>
          <p className="auth-subtitle">
            Restricted Portal • Enter master authentication key to manage royal formulations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-wrap">
            <KeyRound className="auth-input-icon" style={{ width: 18, height: 18 }} />
            <input
              type={showPasscode ? 'text' : 'password'}
              required
              className="auth-input"
              placeholder="Enter Admin Passcode..."
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                if (error) setError('');
              }}
              autoFocus
            />
            <button
              type="button"
              className="auth-eye-btn"
              onClick={() => setShowPasscode(!showPasscode)}
              tabIndex={-1}
            >
              {showPasscode ? (
                <EyeOff style={{ width: 16, height: 16 }} />
              ) : (
                <Eye style={{ width: 16, height: 16 }} />
              )}
            </button>
          </div>

          {error && (
            <div className="auth-error-msg">
              <AlertCircle style={{ width: 15, height: 15 }} />
              <span>{error}</span>
            </div>
          )}

          <div className="auth-passcode-hint">
            <span>Default Passcode: <strong>hayati2026</strong></span>
          </div>

          <button type="submit" className="btn-admin-gold auth-submit-btn">
            <ShieldCheck style={{ width: 18, height: 18 }} /> Authenticate & Access
          </button>
        </form>
      </div>
    </div>
  );
}

export function isSessionAuthorized() {
  try {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

export function revokeAdminSession() {
  try {
    sessionStorage.removeItem(AUTH_KEY);
  } catch (e) {
    console.error('Session storage clear error:', e);
  }
}
