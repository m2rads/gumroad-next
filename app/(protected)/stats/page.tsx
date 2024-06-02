'use client';
import { useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/supabase/client';

const StatsPage = () => {
  const [stats, setStats] = useState({
    numberOfLinks: 0,
    numberOfUsers: 0,
    numberOfPurchases: 0,
    purchaseTotal: '0.00',
    averagePurchase: '0.00',
    numberOfViews: 0,
    numberOfDownloads: 0,
    averageViews: 0,
    averageDownloads: 0,
    lastLinkDate: '',
    lastPurchaseDate: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: links, error: linksError } = await supabase.from('links').select('*');
        const { data: users, error: usersError } = await supabase.from('profiles').select('*');
        const { data: purchases, error: purchasesError } = await supabase.from('purchases').select('*');

        if (linksError || usersError || purchasesError) {
          setError('Failed to load stats.');
          return;
        }

        const numberOfLinks = links.length;
        const numberOfUsers = users.length;
        const numberOfPurchases = purchases.length;

        const purchaseTotal = purchases.reduce((sum: number, purchase: any) => sum + purchase.price, 0);
        const numberOfDownloads = links.reduce((sum: number, link: any) => sum + link.number_of_downloads, 0);
        const numberOfViews = links.reduce((sum: number, link: any) => sum + link.number_of_views, 0);

        const lastLinkDate = links.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]?.created_at;
        const lastPurchaseDate = purchases.sort((a: any, b: any) => new Date(b.create_date).getTime() - new Date(a.create_date).getTime())[0]?.create_date;

        setStats({
          numberOfLinks,
          numberOfUsers,
          numberOfPurchases,
          purchaseTotal: purchaseTotal.toFixed(2),
          averagePurchase: (purchaseTotal / numberOfPurchases).toFixed(2),
          numberOfViews,
          numberOfDownloads,
          averageViews: (numberOfViews / numberOfLinks).toFixed(2) as any,
          averageDownloads: (numberOfDownloads / numberOfLinks).toFixed(2) as any,
          lastLinkDate: lastLinkDate ? new Date(lastLinkDate).toLocaleDateString() : 'N/A',
          lastPurchaseDate: lastPurchaseDate ? new Date(lastPurchaseDate).toLocaleDateString() : 'N/A',
        });
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="main-content">
      <h3>Gumroad lets you sell just like you share.</h3>

      <div className="mini-rule"></div>

      <p>There are <strong>{stats.numberOfLinks}</strong> links and counting.</p>
      <p>There are <strong>{stats.numberOfUsers}</strong> users and counting.</p>
      <p>There have been $<strong>{stats.purchaseTotal}</strong> worth of purchases. There are <strong>{stats.numberOfPurchases}</strong> purchases and counting.</p>
      <p>That's an average of $<strong>{stats.averagePurchase}</strong> per purchase!</p>
      <p>They've been viewed <strong>{stats.numberOfViews}</strong> times and downloaded <strong>{stats.numberOfDownloads}</strong> times.</p>
      <p>That's an average of <strong>{stats.averageViews}</strong> views and <strong>{stats.averageDownloads}</strong> downloads per link!</p>
      <p>The last link was added <strong>{stats.lastLinkDate}</strong> ago.</p>
      <p>The last purchase was made <strong>{stats.lastPurchaseDate}</strong> ago.</p>
    </div>
  );
};

export default StatsPage;
