import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Emails from "./pages/Emails";
import Notifications from "./pages/Notifications";
import Analytics from "./pages/Analytics";

import { NotificationProvider } from "./context/NotificationContext";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <NotificationProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
          },
        }}
      />

      <div className="min-h-screen bg-slate-200 flex">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="
              fixed
              inset-0
              bg-black/50
              z-40
              lg:hidden
            "
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content Container 
          FIX: Added 'lg:pl-72' to push content out from underneath the fixed desktop sidebar.
        */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
          <Navbar setSidebarOpen={setSidebarOpen} />

          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/emails" element={<Emails />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/analytics" element={<Analytics />} />

              <Route
                path="*"
                element={
                  <div className="flex items-center justify-center h-[70vh]">
                    <div className="text-center">
                      <h1 className="text-5xl font-bold text-red-500">
                        404
                      </h1>
                      <p className="text-gray-500 mt-2">
                        Page Not Found
                      </p>
                    </div>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </NotificationProvider>
  );
}

export default App;