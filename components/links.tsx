'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// import { supabase } from '../utils/supabase';

const LinksComponent: React.FC = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
    //   const { data, error } = await supabase.from('links').select('*');
    //   if (error) {
    //     setError(error.message);
    //   } else {
    //     setLinks(data);
    //   }
      setLoading(false);
    };

    fetchLinks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="dashboard" className="links-page">
      <h3>{links.length} link{links.length !== 1 && 's'} <small>{/* links_message */}</small></h3>
      <Link href="/add" className="button" id="add-link-button">Add link</Link>
      {links.length > 0 && (
        <>
          <div className="mini-rule"></div>
          <ul id="links">
            {links.map((link: any) => (
              <li key={link.id}>
                <Link href={`/edit/${link.unique_permalink}`}>{link.name}</Link> <small>${link.formatted_price}</small>
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
