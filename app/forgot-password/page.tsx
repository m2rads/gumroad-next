'use client';

import React, { useState } from 'react';
import { resetPassword } from '../auth-server-action/actions';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const { data, error } = await resetPassword(email);

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Check your email for a link to reset your password.");
    }
  };

  return (
    <div id="large-form">
      <form onSubmit={handleSubmit}>
        {error ? (
          <h3>Enter your email address <small className="error">{error}</small></h3>
        ) : (
          success ? (
            <h3>{success}</h3>
          ) : (
            <h3>Enter your email address <small>And don&apos;t worry about forgetting your password, we do too!</small></h3>
          )
        )}
        <p>
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send email</button>
        </p>
        <div className="rainbow bar"></div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
