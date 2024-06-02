'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/supabase/client';
import { LinkType } from '@/types/link';

interface LinkPaymentFormProps {
  permalink: string;
  link: LinkType;
}

const LinkPaymentForm: React.FC<LinkPaymentFormProps> = ({ permalink, link }) => {
  const [formData, setFormData] = useState({ cardNumber: '', expiryMonth: '', expiryYear: '', securityCode: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatUrl = (url: string) => {
    if (!/^https?:\/\//i.test(url)) {
      return `http://${url}`;
    }
    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Mock payment processing
      if (!formData.cardNumber || !formData.expiryMonth || !formData.expiryYear || !formData.securityCode) {
        setError('Please fill in all the card details.');
        setLoading(false);
        return;
      }

      // Fetch the user information using the owner field from the LinkType object
      const { data: user, error: userError } = await supabase
        .from('profiles')  // Assuming the table name is 'profiles'
        .select('*')
        .eq('id', link.owner)
        .single();

      if (userError) {
        setError(userError.message);
        setLoading(false);
        return;
      }

      // Update link with incremented views and downloads
      const { data, error: updateError } = await supabase
        .from('links')
        .update({
          number_of_views: link.number_of_views + 1,
          number_of_downloads: link.number_of_downloads + 1,
        })
        .eq('id', link.id);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      // Update user balance (mock)
      const { error: balanceError } = await supabase
        .from('profiles')  // Assuming the table name is 'profiles'
        .update({ balance: user.balance + link.price })
        .eq('id', link.owner);

      if (balanceError) {
        setError(balanceError.message);
        setLoading(false);
        return;
      }

      // Record the purchase
      const { error: purchaseError } = await supabase
        .from('purchases')
        .insert([{ owner: link.owner, price: link.price, unique_permalink: link.unique_permalink }]);

      if (purchaseError) {
        setError(purchaseError.message);
        setLoading(false);
        return;
      }

      // Mock email sending
      console.log(`Email sent to ${user.email}: You just sold ${link.name}!`);

      // Redirect to link URL
      window.location.assign(formatUrl(link.url));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="large-form" onSubmit={handleSubmit}>
      {link.preview_url && (
        <a href={formatUrl(link.preview_url)} id="preview_link" target="_blank" rel="noopener noreferrer">
          preview
        </a>
      )}
      <br />

      <h3>Pay ${link.price}</h3>

      {error && <div className="error">{error}</div>}

      <p>
        <label htmlFor="cardNumber">Card Number:</label>
        <input
          id="cardNumber"
          name="cardNumber"
          type="text"
          placeholder="Card number"
          value={formData.cardNumber}
          onChange={handleChange}
          disabled={loading}
        />
      </p>
      <p>
        <label htmlFor="expiryMonth">Card Expiry Date:</label>
        <select
          id="expiryMonth"
          name="expiryMonth"
          value={formData.expiryMonth}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <span id="slash">/</span>
        <select
          id="expiryYear"
          name="expiryYear"
          value={formData.expiryYear}
          onChange={handleChange}
          disabled={loading}
        >
          {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </p>
      <p>
        <label htmlFor="securityCode">Card Security Code:</label>
        <input
          id="securityCode"
          name="securityCode"
          type="text"
          placeholder="Security code"
          value={formData.securityCode}
          onChange={handleChange}
          disabled={loading}
        />
      </p>
      <p className="last-p">
        <button type="submit" id="submit_button" disabled={loading}>
          Pay
        </button>
      </p>

      <div className="rainbow bar"></div>
    </form>
  );
};

export default LinkPaymentForm;
