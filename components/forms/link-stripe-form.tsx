'use client';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface LinkStripeFormProps {
  permalink: string;
  price: number;
}

const LinkStripeForm: React.FC<LinkStripeFormProps> = ({ permalink, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
    });

    if (error) {
      setError(error.message || 'An unexpected error occurred.');
      setProcessing(false);
      return;
    }

    const response = await fetch(`/api/payment/${permalink}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentMethodId: paymentMethod!.id, amount: price }),
    });

    const data = await response.json();
    if (data.success) {
      router.push(data.redirect_url);
    } else {
      setError(data.error_message);
    }
    setProcessing(false);
  };

  return (
    <form id="large-form" onSubmit={handleSubmit}>
      <h3>Pay ${price}</h3>
      {error && <h3 className="error">{error}</h3>}
      <CardElement />
      <p className="last-p">
        <button type="submit" id="submit_button" disabled={processing}>
          {processing ? 'Processing...' : 'Pay'}
        </button>
      </p>
      <div className="rainbow bar"></div>
    </form>
  );
};

const LinkStripeFormWrapper: React.FC<LinkStripeFormProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <LinkStripeForm {...props} />
    </Elements>
  );
};

export default LinkStripeFormWrapper;
