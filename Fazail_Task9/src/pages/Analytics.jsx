import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  fetchDashboardData,
} from "../api/dashbaordApi.js";

import {
  getEmailHistory,
} from "../api/emailApi";

import {
  useNotifications,
} from "../context/NotificationContext";

export default function Analytics() {
  const [stats, setStats] =
    useState({
      totalUsers: 0,
      totalPosts: 0,
      totalComments: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const { notifications } =
    useNotifications();

  useEffect(() => {
    const loadAnalytics =
      async () => {
        try {
          const data =
            await fetchDashboardData();

          setStats(data.stats);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    loadAnalytics();
  }, []);

  const emailCount =
    getEmailHistory().length;

  /*
  |--------------------------------------------------------------------------
  | Bar Chart Data
  |--------------------------------------------------------------------------
  */

  const barData = [
    {
      name: "Users",
      value: stats.totalUsers,
    },
    {
      name: "Posts",
      value: stats.totalPosts,
    },
    {
      name: "Comments",
      value: stats.totalComments,
    },
    {
      name: "Emails",
      value: emailCount,
    },
    {
      name: "Notifications",
      value:
        notifications.length,
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | Pie Chart Data
  |--------------------------------------------------------------------------
  */

  const pieData = [
    {
      name: "Emails",
      value: emailCount,
    },
    {
      name: "Notifications",
      value:
        notifications.length,
    },
  ];

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
  ];

if (loading) {
  return (
    <div className="space-y-6 p-1 animate-pulse">
      {/* 1. Top Greeting/Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-48" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-64" />
      </div>

      {/* 2. Top Metric Cards Grid Skeleton (Matches your 3-4 card layouts) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-6 space-y-3 shadow-sm"
          >
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16" />
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-24" />
          </div>
        ))}
      </div>

      {/* 3. Main Analytics/Charts Row Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Chart Area Placeholder */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-6 h-80 flex flex-col justify-between shadow-sm">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32" />
          <div className="w-full h-56 bg-slate-100 dark:bg-slate-700/50 rounded-xl" />
        </div>

        {/* Small List / Pie Chart Area Placeholder */}
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-6 h-80 flex flex-col justify-between shadow-sm">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-40" />
          <div className="mx-auto w-44 h-44 bg-slate-100 dark:bg-slate-700/50 rounded-full" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24 mx-auto" />
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Analytics Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Visual overview of your
          communication dashboard.
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <h3 className="text-sm text-gray-500">
            Users
          </h3>

          <p className="text-3xl font-bold mt-2">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <h3 className="text-sm text-gray-500">
            Posts
          </h3>

          <p className="text-3xl font-bold mt-2">
            {stats.totalPosts}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <h3 className="text-sm text-gray-500">
            Comments
          </h3>

          <p className="text-3xl font-bold mt-2">
            {stats.totalComments}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <h3 className="text-sm text-gray-500">
            Emails Sent
          </h3>

          <p className="text-3xl font-bold mt-2">
            {emailCount}
          </p>
        </div>
      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bar Chart */}

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-xl font-bold mb-6">
            Dashboard Statistics
          </h2>

          <div className="h-87.5">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={barData}>
                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-xl font-bold mb-6">
            Emails vs Notifications
          </h2>

          <div className="h-87.5">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {pieData.map(
                    (
                      entry,
                      index
                    ) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}