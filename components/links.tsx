'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/supabase/client';
import { useAuth } from './context/auth-context';
import { LinkType } from '@/types/link';


const LinksComponent: React.FC = () => {
  const [links, setLinks] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    const fetchLinks = async () => {
      if (!user) return;

      try {
        const { data: linksData, error } = await supabase
          .from('links')
          .select('*')
          .eq('owner', user.id);

        if (error) {
          setError(error.message);
          return;
        }

        const formattedLinks = linksData.map((link: LinkType) => ({
          ...link,
          formatted_price: parseFloat(link.price).toFixed(2),
        }));

        setLinks(formattedLinks);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const linksMessage =
    links.length === 0
      ? 'create one, you know you want to'
      : links.length < 3
      ? 'not too bad...'
      : "that's a lot!";

  return (
    <div id="dashboard" className="links-page">
      <h3>
        {links.length} link{links.length !== 1 && 's'} <small>{linksMessage}</small>
      </h3>
      <Link href="/add" className="button" id="add-link-button">
        Add link
      </Link>
      {links.length > 0 && (
        <>
          <div className="mini-rule"></div>
          <ul id="links">
            {links.map((link) => (
              <li key={link.id}>
                <Link href={`/edit/${link.unique_permalink}`}>{link.name}</Link>{' '}
                <small>${link.formatted_price}</small>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="rainbow bar"></div>
    </div>
  );
};

export default LinksComponent;
