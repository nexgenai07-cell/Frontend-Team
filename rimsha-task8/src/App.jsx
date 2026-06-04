// ============================================================
// This file defines the overall application layout
// and configures all routes using React Router.
// ============================================================

// Import React to create and render React components
import React from "react";

// Import routing components from React Router
// BrowserRouter → enables client-side routing
// Routes → container for all route definitions
// Route → defines individual routes
// Navigate → redirects users to another route
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import Sidebar component displayed on the left side
import Sidebar from "./components/layout/Sidebar";

// Import TopBar component displayed at the top
import TopBar from "./components/layout/TopBar";

// Import Profile Settings page component
import ProfileSettings from "./pages/ProfileSettings";

// Import Security Settings page component
import SecuritySettings from "./pages/SecuritySettings";

// Import Activity Logs page component
import ActivityLogs from "./pages/ActivityLogs";

// Import Device Management page component
import DeviceManagement from "./pages/DeviceManagement";

// Import Logout page component
import Logout from "./pages/Logout";

// Export the main App component as the default export
export default function App() {
  // Return the complete application UI structure
  return (
    // BrowserRouter enables navigation without full page reloads
    <BrowserRouter>
      {/* Main application layout wrapper */}
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* Sidebar container */}
        {/* Takes full screen height and prevents shrinking */}
        <div className="h-screen shrink-0">
          {/* Render the Sidebar component */}
          <Sidebar />
        </div>

        {/* Right-side content area */}
        {/* Contains TopBar and page content */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {/* Top navigation bar */}
          <TopBar />

          {/* Main content section */}
          {/* flex-1 → fills remaining space */}
          {/* p-4 md:p-8 → responsive padding */}
          {/* overflow-y-auto → enables vertical scrolling */}
          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            {/* Route definitions */}
            <Routes>
              {/* Default route */}
              {/* Redirects root URL "/" to "/profile" */}
              <Route path="/" element={<Navigate to="/profile" replace />} />

              {/* Profile Settings page route */}
              <Route path="/profile" element={<ProfileSettings />} />

              {/* Security Settings page route */}
              <Route path="/security" element={<SecuritySettings />} />

              {/* Activity Logs page route */}
              <Route path="/activity" element={<ActivityLogs />} />

              {/* Device Management page route */}
              <Route path="/devices" element={<DeviceManagement />} />

              {/* Logout page route */}
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
