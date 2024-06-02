'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updatePassword } from '@/app/auth-server-action/actions';

const UpdatePasswordPage = () => {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const { data, error } = await updatePassword(password);

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Your password has been successfully reset.");
      router.push("/")
    }
  };

  return (
    <div id="large-form">
      <form onSubmit={handleSubmit}>
        {error ? (
          <h3>Reset your password <small className="error">{error}</small></h3>
        ) : (
          success ? (
            <h3>{success}</h3>
          ) : (
            <h3>Reset your password <small>And don't worry about forgetting your password, we do too!</small></h3>
          )
        )}
        <p>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Reset Password</button>
        </p>
        <div className="rainbow bar"></div>
      </form>
    </div>
  );
};

export default UpdatePasswordPage;
