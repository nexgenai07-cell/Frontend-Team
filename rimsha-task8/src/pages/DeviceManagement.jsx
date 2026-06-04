// ============================================================
// Displays all registered devices connected to the account.
// Users can remove old devices, but the current device
// cannot be removed for security reasons.
// ============================================================

// React hook for managing component state
import React, { useState } from "react";

// Mock device data used for demonstration
import { mockDevices } from "../data/mockData";

// Device and utility icons
import {
  FiMonitor,
  FiSmartphone,
  FiTablet,
  FiMapPin,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

// Maps device types to their corresponding icon components
const iconMap = {
  laptop: (active) => (
    <FiMonitor
      size={28}
      className={active ? "text-[#1a3c34]" : "text-gray-500"}
    />
  ),
  phone: (active) => (
    <FiSmartphone
      size={28}
      className={active ? "text-[#1a3c34]" : "text-gray-500"}
    />
  ),
  tablet: (active) => (
    <FiTablet
      size={28}
      className={active ? "text-[#1a3c34]" : "text-gray-500"}
    />
  ),
};

export default function DeviceManagement() {
  // Store devices in local state so the UI updates when a device is removed
  const [devices, setDevices] = useState(mockDevices);

  // Removes a device from the list using its unique id
  const removeDevice = (id) => {
    setDevices(devices.filter((d) => d.id !== id));
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Empty state displayed when no devices remain */}
      {devices.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <FiMonitor size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">No devices registered.</p>
        </div>
      )}

      {/* Responsive device card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
        {/* Render a card for each registered device */}
        {devices.map((device) => (
          <div
            key={device.id}
            className={`
              bg-white rounded-2xl p-5 md:p-6 relative
              transition hover:shadow-md
              ${
                device.isCurrent
                  ? "border-2 border-[#0f6e56] shadow-sm"
                  : "border border-gray-200 shadow-sm"
              }
            `}
          >
            {/* Badge shown only for the currently active device */}
            {device.isCurrent && (
              <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#0f6e56] text-white uppercase tracking-wider">
                Current
              </span>
            )}

            {/* Device icon and basic information */}
            <div className="flex items-start gap-4 mb-5">
              <div
                className={`
                  w-14 h-14 rounded-2xl flex items-center justify-center shrink-0
                  ${device.isCurrent ? "bg-emerald-50" : "bg-gray-100"}
                `}
              >
                {/* Display icon based on device type */}
                {iconMap[device.icon]?.(device.isCurrent)}
              </div>

              <div className="min-w-0 pt-1">
                <h3 className="text-sm font-bold text-gray-800 truncate pr-8">
                  {device.name}
                </h3>

                {/* Operating system information */}
                <p className="text-xs text-gray-500 mt-0.5">{device.os}</p>
              </div>
            </div>

            {/* Device activity and location details */}
            <div className="space-y-2.5 mb-5">
              {/* Last active information */}
              <div className="flex items-center gap-2">
                <FiClock size={13} className="text-gray-400 shrink-0" />

                <span className="text-xs text-gray-500">Last Active:</span>

                <span
                  className={`text-xs font-semibold truncate
                    ${
                      device.lastActive === "Active Now"
                        ? "text-emerald-600"
                        : "text-gray-700"
                    }
                  `}
                >
                  {device.lastActive}
                </span>
              </div>

              {/* Device location information */}
              <div className="flex items-center gap-2">
                <FiMapPin size={13} className="text-gray-400 shrink-0" />

                <span className="text-xs text-gray-500">Location:</span>

                <span className="text-xs font-semibold text-gray-700 truncate">
                  {device.location}
                </span>
              </div>
            </div>

            {/* Current device cannot be removed */}
            {device.isCurrent ? (
              <button
                disabled
                className="w-full py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-400 text-sm font-medium cursor-not-allowed"
              >
                Cannot Remove
              </button>
            ) : (
              // Remove selected device from the list
              <button
                onClick={() => removeDevice(device.id)}
                className="w-full py-2.5 rounded-xl border border-red-200 text-red-500 bg-white text-sm font-semibold transition hover:bg-red-50 hover:border-red-300 hover:text-red-600 cursor-pointer"
              >
                Remove Device
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Display total number of registered devices */}
      {devices.length > 0 && (
        <p className="text-xs text-gray-400 mt-4 text-center">
          {devices.length} device{devices.length !== 1 ? "s" : ""} registered
        </p>
      )}
    </div>
  );
}
