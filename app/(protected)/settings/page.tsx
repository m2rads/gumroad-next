'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/supabase/client';
import { useAuth } from '@/components/context/auth-context';

const AccountPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    payment_address: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }

    const fetchUserData = async () => {
      try {        
        const { data, error } = await supabase
          .from('profiles')
          .select('name, email, payment_address')
          .eq('id', user.id)
          .single();

        if (error) {
          setError(error.message);
        } else {
          setFormData({
            name: data.name || '',
            email: data.email || '',
            payment_address: data.payment_address || '',
          });
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, router, supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (user == null) return;

      const { data, error } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          email: formData.email,
          payment_address: formData.payment_address,
        })
        .eq('id', user.id);

      if (error) {
        setError(error.message);
      } else {
        // Update the user's email in the auth.users table
        await supabase.auth.updateUser({
          email: formData.email,
        });

        // Update the owner field in the links table
        await supabase
          .from('links')
          .update({ owner: formData.email })
          .eq('owner', user.email);

        router.push('/');
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form id="large-form" onSubmit={handleSubmit}>
      <h3>Your account settings</h3>
      {error && <small className="error">{error}</small>}
      <p>
        <label htmlFor="name">Full name: </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor="email">Email address: </label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor="payment_address">PayPal address: </label>
        <input
          id="payment_address"
          name="payment_address"
          type="text"
          placeholder="PayPal Address"
          value={formData.payment_address}
          onChange={handleChange}
        />
      </p>
      <p>
        <button type="submit">Update account details</button>
      </p>
      <div className="rainbow bar"></div>
    </form>
  );
};

export default AccountPage;
