import {
  Bell,
  Check,
  Trash2,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { useNotifications } from "../context/NotificationContext";

export default function NotificationCenter() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearNotifications,
  } = useNotifications();

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />;
      case "error":
        return <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />;
      case "warning":
        return <AlertTriangle size={18} className="text-yellow-500 shrink-0 mt-0.5" />;
      default:
        return <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        border-gray-100
        p-4
        sm:p-6
      "
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Bell size={24} className="text-blue-600 shrink-0" />
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Notifications
            </h2>
            <p className="text-sm text-gray-500">
              {unreadCount} unread
            </p>
          </div>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={markAllAsRead}
            className="
              flex-1
              sm:flex-none
              flex
              items-center
              justify-center
              gap-1.5
              px-3
              py-2
              text-sm
              font-medium
              rounded-xl
              bg-green-100
              text-green-700
              hover:bg-green-200
              transition-colors
            "
          >
            <Check size={16} />
            <span className="inline">Read All</span>
          </button>

          <button
            onClick={clearNotifications}
            className="
              flex-1
              sm:flex-none
              flex
              items-center
              justify-center
              gap-1.5
              px-3
              py-2
              text-sm
              font-medium
              rounded-xl
              bg-red-100
              text-red-700
              hover:bg-red-200
              transition-colors
            "
          >
            <Trash2 size={16} />
            <span className="inline">Clear All</span>
          </button>
        </div>
      </div>

      {/* Main Alert List Display Wrapper */}
      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <Bell size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">
            No notifications available
          </p>
        </div>
      ) : (
        <div
          className="
            space-y-3
            max-h-125
            overflow-y-auto
            pr-1
          "
        >
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`
                p-4
                rounded-xl
                border
                transition-all
                duration-200
                ${
                  notification.read
                    ? "bg-gray-50 border-gray-200"
                    : "bg-blue-50/70 border-blue-100"
                }
              `}
            >
              {/* Card Container Layout: Vertically stacks on mobile, columns layout on tablet+ */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-4">
                <div className="flex gap-3 items-start flex-1 min-w-0">
                  {getIcon(notification.type)}

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base wrap-break-word">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-0.5 wrap-break-word">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {formatDate(notification.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Inline Action Row Controls */}
                <div className="flex sm:flex-col items-center justify-end sm:justify-start gap-2 pt-2 sm:pt-0 border-t border-gray-100 sm:border-0">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="
                        flex-1
                        sm:flex-initial
                        flex
                        items-center
                        justify-center
                        p-2
                        rounded-lg
                        bg-green-100
                        text-green-600
                        hover:bg-green-200
                        transition-colors
                      "
                      title="Mark as Read"
                    >
                      <Check size={16} />
                    </button>
                  )}

                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="
                      flex-1
                      sm:flex-initial
                      flex
                      items-center
                      justify-center
                      p-2
                      rounded-lg
                      bg-red-100
                      text-red-600
                      hover:bg-red-200
                      transition-colors
                    "
                    title="Delete Notification"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}