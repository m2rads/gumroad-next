'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/supabase/client';
import LinkPaymentForm from '@/components/forms/link-payment-form';

const ViewLinkPage: React.FC = () => {
  const { permalink } = useParams();
  const supabase = createSupabaseBrowserClient();
  const [link, setLink] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLink = async () => {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('unique_permalink', permalink)
        .single();

      if (error) {
        setError('Link not found');
      } else {
        // Increment view count
        await supabase
          .from('links')
          .update({ number_of_views: data.number_of_views + 1 })
          .eq('id', data.id);

        setLink(data);
      }
      setLoading(false);
    };

    fetchLink();
  }, [permalink, supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (typeof permalink !== 'string') {
    return <div>Invalid permalink</div>;
  }

  return (
    <div id="link-content">
      {(link.description || link.preview_url) && (
        <div id="description-box">
          <p>{link.description}</p>
        </div>
      )}

      <form id="large-form" name="large-form">
        {link.preview_url && <a href={link.preview_url} id="preview_link" target="_blank">preview</a>}

        <h3>Pay ${link.price}</h3>

        <LinkPaymentForm permalink={permalink} price={link.price} />

        <div className="rainbow bar"></div>
      </form>
    </div>
  );
};

export default ViewLinkPage;
