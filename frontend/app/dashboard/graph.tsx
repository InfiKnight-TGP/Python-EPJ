"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

export default function Graph() {
  const [chartData, setChartData] = useState({
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Memory Score",
        data: [0, 0, 0, 0],
        borderColor: "rgb(37, 99, 235)",
        backgroundColor: "rgba(37, 99, 235, 0.5)",
      },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await fetch("http://localhost:5000/performance");
        const data = await response.json();
        
        if (data.scores && data.scores.length > 0) {
          // Group scores by week
          const weeklyScores = calculateWeeklyAverages(data.scores);
          
          setChartData({
            labels: weeklyScores.labels,
            datasets: [
              {
                label: "Memory Score",
                data: weeklyScores.data,
                borderColor: "rgb(37, 99, 235)",
                backgroundColor: "rgba(37, 99, 235, 0.5)",
              },
            ],
          });
        } else {
          // Use default data if no scores yet
          setChartData({
            labels: ["No data yet"],
            datasets: [
              {
                label: "Memory Score",
                data: [0],
                borderColor: "rgb(37, 99, 235)",
                backgroundColor: "rgba(37, 99, 235, 0.5)",
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching performance data:", error);
        // Keep default empty data on error
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, []);

  const calculateWeeklyAverages = (scores: any[]) => {
    // Get current date
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Get first day of current month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    
    // Calculate which week we're in (1-4)
    const dayOfMonth = now.getDate();
    const currentWeekNumber = Math.ceil(dayOfMonth / 7);
    
    // Create weeks array for the current month (up to current week)
    const weeks: { start: Date; end: Date; scores: number[]; weekNum: number }[] = [];
    
    for (let i = 0; i < currentWeekNumber; i++) {
      const weekStart = new Date(currentYear, currentMonth, i * 7 + 1);
      const weekEnd = new Date(currentYear, currentMonth, Math.min((i + 1) * 7, dayOfMonth));
      weeks.push({ start: weekStart, end: weekEnd, scores: [], weekNum: i + 1 });
    }
    
    // Assign scores to weeks
    scores.forEach((score) => {
      const scoreDate = new Date(score.date || score.timestamp);
      // Only include scores from current month
      if (scoreDate.getMonth() === currentMonth && scoreDate.getFullYear() === currentYear) {
        weeks.forEach((week) => {
          if (scoreDate >= week.start && scoreDate <= week.end) {
            week.scores.push(score.score);
          }
        });
      }
    });
    
    // Calculate averages and create labels
    const labels = weeks.map((week) => `Week ${week.weekNum}`);
    const data = weeks.map((week) => {
      if (week.scores.length === 0) return 0;
      return Math.round(
        week.scores.reduce((sum, score) => sum + score, 0) / week.scores.length
      );
    });
    
    return { labels, data };
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center pb-6 pt-4">
        <p className="text-muted-foreground">Loading performance data...</p>
      </div>
    );
  }

  return (
    <Line
      className="w-full pb-6 pt-4"
      options={{
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: function(context) {
                return 'Memory Score: ' + context.parsed.y + '%';
              }
            }
          },
          legend: {
            display: false,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.3,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            title: {
              display: true,
              text: new Date().toLocaleDateString('en-US', { month: 'short' }),
              font: {
                size: 12,
                weight: 'bold',
              }
            }
          },
          y: {
            grid: {
              display: true,
              color: 'rgba(0, 0, 0, 0.05)',
            },
            min: 0,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            },
            title: {
              display: true,
              text: 'Memory Performance',
              font: {
                size: 12,
                weight: 'bold',
              }
            }
          },
        },
      }}
      data={chartData}
    />
  );
}
