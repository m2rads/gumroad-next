'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/context/auth-context';
import { createSupabaseBrowserClient } from '@/supabase/client';

const AccountPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', paymentAddress: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    const fetchAccountData = async () => {
      if (!user) return;

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', user.email)
          .single();

        if (error) {
          setError(error.message);
        } else {
          setFormData({
            name: profile.name,
            email: profile.email,
            paymentAddress: profile.payment_address,
          });
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [user, supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Update the profile without changing the email
      if (user == null) return;
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          payment_address: formData.paymentAddress,
        })
        .eq('email', user.email);

      if (profileError) {
        setError(profileError.message);
      } else {
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
      {error && <h3 className="error">{error}</h3>}
      <h3>Your account settings</h3>
      <p>
        <label htmlFor="name">Full name: </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Full Name"
          value={formData.name || ''}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor="email">Email address: </label>
        <input
          type="text"
          placeholder="Email Address"
          name="email"
          value={formData.email || ''}
          disabled
        />
      </p>
      <p>
        <label htmlFor="paymentAddress">PayPal address: </label>
        <input
          id="paymentAddress"
          name="paymentAddress"
          type="text"
          placeholder="PayPal Address"
          value={formData.paymentAddress || ''}
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
