import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Mail,
  Bell,
  BarChart3,
  X,
} from "lucide-react";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Emails",
      path: "/emails",
      icon: Mail,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: Bell,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`
          fixed inset-0 bg-black/50 z-40
          lg:hidden
          transition-all duration-300
          ${
            sidebarOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          w-72
          h-screen
          bg-slate-900
          text-white
          flex
          flex-col
          shadow-2xl

          transform
          transition-transform
          duration-300
          ease-in-out

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="
              p-2
              rounded-lg
              hover:bg-slate-800
              transition
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* Logo Container (Fixed: added pt-6 to resolve top alignment) */}
        <div className="px-6 pt-6 pb-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold">
            MailCenter
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Communication Dashboard
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) => `
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-xl
                      font-medium
                      transition-all
                      duration-200

                      ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span>
                      {item.name}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

      
      </aside>
    </>
  );
}