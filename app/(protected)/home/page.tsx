'use client';

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { createSupabaseBrowserClient } from '@/supabase/client';
import { useAuth } from '@/components/context/auth-context';

interface HomeProps {
  showError: boolean;
  errorMessage?: string;
  numberOfDays: number;
  showChart: boolean;
  chartData: { name: string; value: number }[];
  lastSevenDaysPurchaseTotal: string;
  lastMonthPurchaseTotal: string;
  purchaseTotal: string;
}

const Home: React.FC<HomeProps> = ({
  showError,
  errorMessage,
  numberOfDays,
  showChart,
  chartData,
  lastSevenDaysPurchaseTotal,
  lastMonthPurchaseTotal,
  purchaseTotal,
}) => {
  return (
    <div id="dashboard">
      {showError ? (
        <h3 className="error">{errorMessage}</h3>
      ) : (
        <h3>Last {numberOfDays} day{numberOfDays !== 1 && 's'}</h3>
      )}
      <div className="chart">
        {showChart ? (
          <ResponsiveContainer width="100%" height={225}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#CC333F" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>Wait a few days and a chart will show up here!</p>
        )}
      </div>
      
      <div className="mini-rule"></div>

      <div id="history">
        <h4>History:</h4>
        <p><strong>${lastSevenDaysPurchaseTotal}</strong> in the past 7 days.</p>
        <p><strong>${lastMonthPurchaseTotal}</strong> in the past month.</p>
        <p><strong>${purchaseTotal}</strong> in total.</p>
      </div>

      <div className="rainbow bar" id="loading-bar"></div>
    </div>
  );
};

const IndexPage = () => {
  const { user, loading } = useAuth();
  const [data, setData] = useState<HomeProps>({
    showError: false,
    errorMessage: '',
    numberOfDays: 0,
    showChart: false,
    chartData: [],
    lastSevenDaysPurchaseTotal: '0.00',
    lastMonthPurchaseTotal: '0.00',
    purchaseTotal: '0.00',
  });

  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const { data: purchases, error } = await supabase
          .from('purchases')
          .select('price, create_date')
          .eq('owner', user.id); // Ensure user.id is available

        if (error) {
          setData((prev) => ({ ...prev, showError: true, errorMessage: error.message }));
          return;
        }

        const lastSevenDaysPurchases = purchases.filter((purchase: any) => {
          const purchaseDate = new Date(purchase.create_date);
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          return purchaseDate >= sevenDaysAgo;
        });

        const lastMonthPurchases = purchases.filter((purchase: any) => {
          const purchaseDate = new Date(purchase.create_date);
          const monthAgo = new Date();
          monthAgo.setDate(monthAgo.getDate() - 30);
          return purchaseDate >= monthAgo;
        });

        const chartData = lastSevenDaysPurchases.map((purchase: any, index: number) => ({
          name: `Day ${index + 1}`,
          value: purchase.price,
        }));

        const lastSevenDaysPurchaseTotal = lastSevenDaysPurchases.reduce((sum: number, purchase: any) => sum + purchase.price, 0);
        const lastMonthPurchaseTotal = lastMonthPurchases.reduce((sum: number, purchase: any) => sum + purchase.price, 0);
        const purchaseTotal = purchases.reduce((sum: number, purchase: any) => sum + purchase.price, 0);

        setData({
          showError: false,
          errorMessage: '',
          numberOfDays: 7,
          showChart: chartData.length > 0,
          chartData,
          lastSevenDaysPurchaseTotal: lastSevenDaysPurchaseTotal.toFixed(2),
          lastMonthPurchaseTotal: lastMonthPurchaseTotal.toFixed(2),
          purchaseTotal: purchaseTotal.toFixed(2),
        });
      } catch (error) {
        setData((prev) => ({ ...prev, showError: true, errorMessage: "error while building the chart" }));
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Home {...data} />;
};

export default IndexPage;
