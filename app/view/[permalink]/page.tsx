'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/supabase/client';
import LinkPaymentForm from '@/components/forms/link-payment-form';
import Link from 'next/link';

const ViewLinkPage: React.FC = () => {
  const { permalink } = useParams();
  const supabase = createSupabaseBrowserClient();
  const [link, setLink] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatUrl = (url: string) => {
    if (!/^https?:\/\//i.test(url)) {
      return `http://${url}`;
    }
    return url;
  };

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

        // Redirect if price is less than 0.01
        if (data.price < 0.01) {
          window.location.assign(formatUrl(data.url));
          return; 
        }
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
      <div id="header">
        <Link href="/"><h1 id="logo">Gumroad</h1></Link>
        <p>{link.name}{link.user_name && ` from ${link.user_name}`}</p>
      </div>

      {(link.description || link.preview_url) && (
        <div id="description-box">
          <p>{link.description}</p>
        </div>
      )}
      <LinkPaymentForm permalink={permalink} link={link} />
    </div>
  );
};

export default ViewLinkPage;
