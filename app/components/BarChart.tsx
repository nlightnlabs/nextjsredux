// BarChart.tsx
import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data?: any[];
  labels?: string[];
  values?: number[];
  aggregation?: string;
  yAxisTitle?: string;
  yAxisTitleFontSize?: number;
  yAxisTitleColor?: string;
  xAxisTitle?: string;
  xAxisTitleFontSize?: number;
  xAxisTitleColor?: string;
  labelsField?: string;
  barColor?: string;
  width?: string;
  height?: string;
  axisFontSize?: number;
  axisFontColor?: string;
  valueFontSize?: number;
  valueColor?: string;
  tickSize?: number;
}

const App = ({
  labels,
  values,
  width,
  height,
  yAxisTitle,
  yAxisTitleFontSize,
  yAxisTitleColor,
  xAxisTitle,
  xAxisTitleFontSize,
  xAxisTitleColor,
  barColor,
  axisFontSize,
  axisFontColor,
  valueFontSize,
  valueColor,
  tickSize,
}: ChartProps) => {
  const [chartData, setChartData] = useState<any>(null);

  const prepareChartData = async () => {
    const datasets = [
      {
        label: yAxisTitle, // rgba format
        backgroundColor: barColor || 'rgba(0, 150, 225, 0.5)',
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 0,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,0)',
        data: values,
      },
    ];

    setChartData({
      labels,
      datasets,
    });
  };


  const calculateLabelRotation = () => {
    if (!labels || labels.length === 0) return 0;

    const labelLengths = labels.map(label => label.length);
    const averageLabelLength = labelLengths.reduce((acc, len) => acc + len, 0) / labels.length;
    const averageLabelWidth = averageLabelLength * (axisFontSize || 12); // Approximate width based on font size
    const chartWidth = parseInt(width || '600'); // Default width if not provided
    const availableWidthPerLabel = chartWidth / labels.length;

    return averageLabelWidth > availableWidthPerLabel ? 90 : 0;
  };


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: xAxisTitle,
          color: xAxisTitleColor || 'rgba(0,0,0,1)',
          font: {
            size: xAxisTitleFontSize || 16,
          },
        },
        ticks: {
          color: axisFontColor || 'rgba(200,200,200,1)',
          font: {
            size: tickSize ? tickSize : axisFontSize ? axisFontSize : 12,
          },
          padding: 5, 
          labelOffset: -20,
          callback: function(index: any) {
            const maxWidth = 50; 
            const fontSize = axisFontSize ? axisFontSize : 12;
            const textWidth = fontSize*(labels[index].length);
            let updatedLabel:any = "";
            if(textWidth > maxWidth){
              updatedLabel = (labels[index]).split(" ");
            }
            return updatedLabel;
          },
          maxRotation: calculateLabelRotation(),
          minRotation: calculateLabelRotation(),
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yAxisTitle,
          color: yAxisTitleColor || 'rgba(0,0,0,1)',
          font: {
            size: yAxisTitleFontSize || 16,
          },
          rotation: -90,
        },
        ticks: {
          color: axisFontColor || 'rgb(200,200,200)',
          font: {
            size: tickSize ? tickSize : axisFontSize ? axisFontSize : 12,
          },
        },
      },
    },
    plugins: {
      tooltip: {
        titleFont: {
          size: valueFontSize ? valueFontSize + 2 : 14,
          color: 'rgba(0,0,0,1)',
        },
        bodyFont: {
          size: valueFontSize || 12,
          color: valueColor || 'rgba(200,200,200,1)',
        },
      },
      legend: {
        display: false,
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
          color: valueColor || 'rgba(200,200,200,1)',
        },
      },
    },
  };

  useEffect(() => {
    prepareChartData();
  }, []);

  return (
    <div style={{ width, height }} className="fade-in">
      {chartData !== null && <Bar data={chartData} options={options} />}
    </div>
  );
};

export default App;
