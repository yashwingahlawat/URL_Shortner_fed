import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getUrlAnalytics } from "../api/urls";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface AnalyticsData {
  totalClicks: number;
  uniqueVisitors: number;
  last30DaysClicks: Record<string, number>;
}

interface ChartPoint {
  date: string;
  clicks: number;
}

export default function Analytics() {
  const { id } = useParams();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);

  const loadAnalytics = async () => {
    try {
      const res = await getUrlAnalytics(Number(id));

      if (res.data.success) {
        const analytics: AnalyticsData = res.data.data;
        setData(analytics);

        const arr = Object.entries(analytics.last30DaysClicks).map(
          ([date, clicks]) => ({
            date,
            clicks
          })
        );

        setChartData(arr);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to load analytics");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadAnalytics();
    };
    fetchData();
  }, []);


  if (!data)
    return (
      <DashboardLayout>
        <p className="text-gray-600 dark:text-gray-300">Loading analytics...</p>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex items-center justify-between mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Analytics
        </h1>

        <Link to="/">
          <Button variant="secondary">⬅ Back</Button>
        </Link>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10"
      >
        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl border dark:border-gray-700"
        >
          <p className="text-gray-600 dark:text-gray-400">Total Clicks</p>
          <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">
            {data.totalClicks}
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl border dark:border-gray-700"
        >
          <p className="text-gray-600 dark:text-gray-400">Unique Visitors</p>
          <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">
            {data.uniqueVisitors}
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-white dark:bg-gray-800 shadow rounded-xl border dark:border-gray-700"
        >
          <p className="text-gray-600 dark:text-gray-400">Last 30 Days Clicks</p>
          <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">
            {chartData.reduce((sum: number, d: ChartPoint) => sum + d.clicks, 0)}
          </p>
        </motion.div>
      </motion.div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="bg-white dark:bg-gray-800 p-6 shadow rounded-xl border dark:border-gray-700 h-[420px]"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Clicks Over Last 30 Days
        </h2>

        {chartData.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No click data available yet.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%" className="p-2">
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                className="dark:stroke-gray-700"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: document.documentElement.classList.contains("dark")? "#d1d5db"  : "#374151" }}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: document.documentElement.classList.contains("dark")? "#d1d5db"  : "#374151" }}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--x-bg)",
                  borderRadius: "8px",
                  border: "1px solid var(--x-border)"
                }}
                labelStyle={{ color: "var(--x-text)" }}
              />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ stroke: "#2563eb", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
