'use client';

import React from 'react';

interface HomeProps {
  showError: boolean;
  errorMessage?: string;
  numberOfDays: number;
  showChart: boolean;
  chartMax: number;
  chartNumbers: string;
  lastSevenDaysPurchaseTotal: string; // Should be formatted price
  lastMonthPurchaseTotal: string; // Should be formatted price
  purchaseTotal: string; // Should be formatted price
}

const Home: React.FC<HomeProps> = ({
  showError,
  errorMessage,
  numberOfDays,
  showChart,
  chartMax,
  chartNumbers,
  lastSevenDaysPurchaseTotal,
  lastMonthPurchaseTotal,
  purchaseTotal,
}) => {
  const chartUrl = `https://chart.googleapis.com/chart?chxr=0,0,${chartMax}&chf=bg,s,ffffff&chxt=y&chbh=a&chs=640x225&chco=CC333F,EB6841&cht=bvg&chds=0,${chartMax}&chd=t:${chartNumbers}`;

  return (
    <div id="dashboard">
      {showError ? (
        <h3 className="error">{errorMessage}</h3>
      ) : (
        <h3>Last {numberOfDays} day{numberOfDays !== 1 && 's'}</h3>
      )}
      
      <div className="chart">
        {showChart ? (
          <img 
            src={chartUrl} 
            width="640" 
            height="225" 
            alt="Chart"
          />
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
    chartMax: 120, // 1.2 * max value from chart_numbers
    chartNumbers: '10,20,30,40,50,60,70,80,90,100', // Example data
    lastSevenDaysPurchaseTotal: '500.00', // Formatted price
    lastMonthPurchaseTotal: '2000.00', // Formatted price
    purchaseTotal: '10000.00', // Formatted price
  };

  return <Home {...sampleData} />;
};

export default IndexPage;
