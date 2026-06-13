import {
  Bell,
  User,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";

export default function Navbar({
  setSidebarOpen,
}) {
  const {
    unreadCount,
    notifications,
  } = useNotifications();

  const currentDate =
    new Date().toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        {/* Left Section */}

        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}

          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="
              lg:hidden
              p-2
              rounded-lg
              hover:bg-gray-100
              transition
            "
          >
            <Menu size={22} />
          </button>

          <div>
            <h1
              className="
                text-lg
                md:text-2xl
                font-bold
                text-gray-800
                truncate
              "
            >
              Email & Notifications Center
            </h1>

            <p className="hidden sm:block text-sm text-gray-500">
              {currentDate}
            </p>
          </div>
        </div>

        {/* Right Section */}

        <div className="flex items-center gap-4 md:gap-6">
          {/* Notification Bell */}

          <Link to="/notifications" className="relative cursor-pointer">
            <Bell
              size={24}
              className="text-gray-700"
            />

            {unreadCount > 0 && (
              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  min-w-4.5
                  h-4.5
                  rounded-full
                  bg-red-500
                  text-white
                  text-[10px]
                  flex
                  items-center
                  justify-center
                  px-1
                "
              >
                {unreadCount}
              </span>
            )}
          </Link>

          {/* User */}

          <div className="flex items-center gap-3">
            <div
              className="
                w-10
                h-10
                rounded-full
                bg-blue-100
                flex
                items-center
                justify-center
              "
            >
              <User
                size={20}
                className="text-blue-600"
              />
            </div>

            <div className="hidden md:block">
              <h3 className="font-semibold text-sm text-gray-800">
                Admin User
              </h3>

              <p className="text-xs text-gray-500">
                {
                  notifications.length
                }{" "}
                Notifications
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}