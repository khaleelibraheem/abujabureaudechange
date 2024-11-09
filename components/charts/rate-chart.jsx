"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function RateChart({ data, currency }) {
  const chartData = {
    labels: data.map((d) => format(new Date(d.date), "MMM dd")),
    datasets: [
      {
        label: `${currency} Exchange Rate`,
        data: data.map((d) => d.rate),
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#1f2937",
        bodyColor: "#1f2937",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 12,
        bodyFont: {
          size: 14,
        },
        titleFont: {
          size: 14,
          weight: "bold",
        },
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(6);
            }
            return label;
          },
        },
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
      axis: "x",
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "rgba(229, 231, 235, 0.5)",
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: 8,
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          display: true,
          color: "rgba(229, 231, 235, 0.5)",
        },
        ticks: {
          font: {
            size: 12,
          },
          callback: function (value) {
            return value.toFixed(6);
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px]">
      <Line data={chartData} options={options} />
    </div>
  );
}
