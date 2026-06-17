import {
  
 
} from "lucide-react";

import NotificationCenter from "../components/NotificationCenter";

import {
  useNotifications,
} from "../context/NotificationContext";

export default function Notifications() {
  const {
    notifications,
    unreadCount,
  
   
  } = useNotifications();

  

  return (
    <div className="space-y-6">
      {/* Page Header */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Notifications
        </h1>

        <p className="text-gray-500 mt-1">
          Manage notifications and
          notification preferences.
        </p>
      </div>

      {/* Stats */}

      <div
        className="
          grid
          md:grid-cols-3
          gap-5
        "
      >
        <div
          className="
            bg-white
            p-5
            rounded-2xl
            border
            shadow-sm
          "
        >
          <h3 className="text-gray-500 text-sm">
            Total Notifications
          </h3>

          <p className="text-3xl font-bold mt-2">
            {notifications.length}
          </p>
        </div>

        <div
          className="
            bg-white
            p-5
            rounded-2xl
            border
            shadow-sm
          "
        >
          <h3 className="text-gray-500 text-sm">
            Unread
          </h3>

          <p className="text-3xl font-bold mt-2 text-red-500">
            {unreadCount}
          </p>
        </div>

        <div
          className="
            bg-white
            p-5
            rounded-2xl
            border
            shadow-sm
          "
        >
          <h3 className="text-gray-500 text-sm">
            Read
          </h3>

          <p className="text-3xl font-bold mt-2 text-green-500">
            {
              notifications.length -
              unreadCount
            }
          </p>
        </div>
      </div>


      {/* Notification Center */}

      <NotificationCenter />
    </div>
  );
}