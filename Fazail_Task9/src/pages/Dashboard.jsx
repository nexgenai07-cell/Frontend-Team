import {
  useCallback,
  useState,
} from "react";

import {
  Users,
  FileText,
  MessageCircle,
  Mail,
  Bell,
} from "lucide-react";

import StatsCards from "../components/StatsCards";
import EmailComposer from "../components/EmailComposer";
import ActivityFeed from "../components/ActivityFeed";

import usePolling from "../hooks/usePolling";

import {
  fetchDashboardData,
} from "../api/dashbaordApi.js";

import {
  getEmailHistory,
} from "../api/emailApi";

import {
  useNotifications,
} from "../context/NotificationContext";

export default function Dashboard() {
  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState({
      totalUsers: 0,
      totalPosts: 0,
      totalComments: 0,
    });

  const [activities, setActivities] =
    useState([]);

  const {
    notifications,
    addNotification,
  } = useNotifications();

  /*
  |--------------------------------------------------------------------------
  | Load Dashboard Data
  |--------------------------------------------------------------------------
  */

  const loadDashboardData =
    useCallback(async () => {
      try {
        const data =
          await fetchDashboardData();

        setStats(data.stats);

        setActivities((prev) => [
          {
            id: Date.now(),
            type: "refresh",
            message:
              "Dashboard data refreshed",
            createdAt:
              new Date().toISOString(),
          },
          ...prev.slice(0, 49),
        ]);
      } catch (error) {
        console.error(error);

        addNotification({
          title: "API Error",
          message:
            "Failed to refresh dashboard data",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    }, [addNotification]);

  /*
  |--------------------------------------------------------------------------
  | Polling
  |--------------------------------------------------------------------------
  */

  usePolling(
    loadDashboardData,
    10000
  );

  /*
  |--------------------------------------------------------------------------
  | Activity Handler
  |--------------------------------------------------------------------------
  */

  const handleActivity = (
    activity
  ) => {
    setActivities((prev) => [
      activity,
      ...prev,
    ]);
  };

  /*
  |--------------------------------------------------------------------------
  | Email Count
  |--------------------------------------------------------------------------
  */

  const emailCount =
    getEmailHistory().length;

  /*
  |--------------------------------------------------------------------------
  | Loading State
  |--------------------------------------------------------------------------
  */

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Monitor emails,
            notifications and
            system activity.
          </p>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last Updated:{" "}
          {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Summary Banner */}

      <div
        className="
          bg-linear-to-r
          from-blue-600
          to-indigo-600
          text-white
          rounded-2xl
          p-6
          shadow-lg
        "
      >
        <h2 className="text-xl font-semibold">
          Communication Center
        </h2>

        <p className="mt-2 text-blue-100">
          {emailCount} Emails Sent •{" "}
          {notifications.length}
          Notifications •{" "}
          {activities.length}
          Activities Logged
        </p>
      </div>

      {/* Stats Cards */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-5
          gap-5
        "
      >
        <StatsCards
          title="Users"
          value={stats.totalUsers}
          icon={Users}
          color="bg-blue-500"
        />

        <StatsCards
          title="Posts"
          value={stats.totalPosts}
          icon={FileText}
          color="bg-green-500"
        />

        <StatsCards
          title="Comments"
          value={
            stats.totalComments
          }
          icon={MessageCircle}
          color="bg-purple-500"
        />

        <StatsCards
          title="Emails Sent"
          value={emailCount}
          icon={Mail}
          color="bg-orange-500"
        />

        <StatsCards
          title="Notifications"
          value={
            notifications.length
          }
          icon={Bell}
          color="bg-red-500"
        />
      </div>

      {/* Main Content */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
        "
      >
        {/* Email Composer */}

        <div
          className="
            bg-white
            dark:bg-gray-900
            rounded-2xl
            shadow-sm
            border
            border-gray-200
            dark:border-gray-800
            p-6
            hover:shadow-lg
            transition-all
            duration-300
          "
        >
          <EmailComposer
            onActivity={
              handleActivity
            }
          />
        </div>

        {/* Activity Feed */}

        <div
          className="
            bg-white
            dark:bg-gray-900
            rounded-2xl
            shadow-sm
            border
            border-gray-200
            dark:border-gray-800
            p-6
            hover:shadow-lg
            transition-all
            duration-300
          "
        >
          {activities.length >
          0 ? (
            <ActivityFeed
              activities={
                activities
              }
            />
          ) : (
            <div className="text-center py-12">
              <Bell className="mx-auto w-12 h-12 text-gray-400" />

              <h3 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                No Activity Yet
              </h3>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Activities will
                appear here when
                users interact
                with the system.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}