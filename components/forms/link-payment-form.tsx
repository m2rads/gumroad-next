'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/supabase/client';
import { LinkType } from '@/types/link';
import Link from 'next/link';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // TODO: Implement payment processing logic here

    try {
      let price = link.price
      // Simulate successful payment
      const response = await supabase
        .from('purchases')
        .insert([{ permalink, price, ...formData }]);

      if (response.error) {
        setError(response.error.message);
      } else {
        router.push('/success');
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="large-form" onSubmit={handleSubmit}>
      {link.preview_url && <Link href={link.preview_url} id="preview_link" target="_blank">preview</Link>}

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
          {/* Add options for months */}
        </select>
        <span id="slash">/</span>
        <select
          id="expiryYear"
          name="expiryYear"
          value={formData.expiryYear}
          onChange={handleChange}
          disabled={loading}
        >
          {/* Add options for years */}
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
