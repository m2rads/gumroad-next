'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
      {/* Had to use a third party lib for representing charts as google char api was deprecated */}
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

const IndexPage: React.FC = () => {
  const sampleData = {
    showError: false,
    errorMessage: '',
    numberOfDays: 7,
    showChart: true,
    chartData: [
      { name: 'Day 1', value: 10 },
      { name: 'Day 2', value: 20 },
      { name: 'Day 3', value: 30 },
      { name: 'Day 4', value: 40 },
      { name: 'Day 5', value: 50 },
      { name: 'Day 6', value: 60 },
      { name: 'Day 7', value: 70 },
    ],
    lastSevenDaysPurchaseTotal: '500.00',
    lastMonthPurchaseTotal: '2000.00',
    purchaseTotal: '10000.00',
  };

  return <Home {...sampleData} />;
};

export default IndexPage;
