// pages/links/edit/[permalink].tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/context/auth-context';
import LinkForm from '@/components/forms/link-form';
import { createSupabaseBrowserClient } from '@/supabase/client';

const EditLinkPage = ({ params }: { params: { permalink: string } }) => {
  const [linkData, setLinkData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    const fetchLinkData = async () => {
      try {
        const { data: link, error } = await supabase
          .from('links')
          .select('*')
          .eq('unique_permalink', params.permalink)
          .single();

        if (error) {
          setError(error.message);
        } else {
          setLinkData(link);
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchLinkData();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, params.permalink]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {linkData && <LinkForm editing initialData={linkData} />}
    </div>
  );
};

export default EditLinkPage;
