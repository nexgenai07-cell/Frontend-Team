import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

/*
|--------------------------------------------------------------------------
| Create Context
|--------------------------------------------------------------------------
|
| This creates a global context that can be accessed
| from any component in the application.
|
*/
const NotificationContext = createContext();

/*
|--------------------------------------------------------------------------
| Custom Hook
|--------------------------------------------------------------------------
|
| Allows easy access to notification context.
|
| Example:
|
| const {
|   notifications,
|   addNotification
| } = useNotifications();
|
*/
// eslint-disable-next-line react-refresh/only-export-components
export const useNotifications = () => useContext(NotificationContext);

/*
|--------------------------------------------------------------------------
| Notification Provider
|--------------------------------------------------------------------------
|
| Wraps the entire application and provides
| notification state + functions globally.
|
*/
export const NotificationProvider = ({
  children,
}) => {
  /*
  |--------------------------------------------------------------------------
  | Notifications State
  |--------------------------------------------------------------------------
  |
  | Load notifications from localStorage.
  | This prevents data loss after refresh.
  |
  */
  const [notifications, setNotifications] =
    useState(() => {
      const saved =
        localStorage.getItem("notifications");

      return saved ? JSON.parse(saved) : [];
    });

  /*
  |--------------------------------------------------------------------------
  | Notification Preferences
  |--------------------------------------------------------------------------
  |
  | Controls browser notifications.
  | These values can later be managed from
  | a Notification Preferences page.
  |
  */
  const [preferences, setPreferences] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "notificationPreferences"
        );

      return saved
        ? JSON.parse(saved)
        : {
            browser: true,
            emailAlerts: true,
            activityAlerts: true,
          };
    });

  /*
  |--------------------------------------------------------------------------
  | Persist Notifications
  |--------------------------------------------------------------------------
  |
  | Every time notifications change,
  | update localStorage.
  |
  */
  useEffect(() => {
    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  /*
  |--------------------------------------------------------------------------
  | Persist Preferences
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    localStorage.setItem(
      "notificationPreferences",
      JSON.stringify(preferences)
    );
  }, [preferences]);

  /*
  |--------------------------------------------------------------------------
  | Request Browser Permission
  |--------------------------------------------------------------------------
  |
  | Runs once when app loads.
  |
  */
  useEffect(() => {
    if (
      "Notification" in window &&
      Notification.permission ===
        "default"
    ) {
      Notification.requestPermission();
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Add Notification
  |--------------------------------------------------------------------------
  |
  | Creates a new notification.
  |
  | Types:
  | success
  | error
  | warning
  | info
  |
  */
  const addNotification = ({
    title,
    message,
    type = "info",
  }) => {
    const newNotification = {
      id: Date.now(),

      title,

      message,

      type,

      read: false,

      createdAt:
        new Date().toISOString(),
    };

    /*
    --------------------------------------------------
    Add notification at the beginning
    so newest appears first.
    --------------------------------------------------
    */
    setNotifications((prev) => [
      newNotification,
      ...prev,
    ]);

    /*
    --------------------------------------------------
    Browser Notification
    --------------------------------------------------
    */
    if (
      preferences.browser &&
      "Notification" in window &&
      Notification.permission ===
        "granted"
    ) {
      new Notification(title, {
        body: message,
      });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Remove Notification
  |--------------------------------------------------------------------------
  |
  | Deletes a single notification.
  |
  */
  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter(
        (notification) =>
          notification.id !== id
      )
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Mark Notification As Read
  |--------------------------------------------------------------------------
  */
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Mark All As Read
  |--------------------------------------------------------------------------
  */
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Clear Notifications
  |--------------------------------------------------------------------------
  |
  | Remove all notifications.
  |
  */
  const clearNotifications = () => {
    setNotifications([]);
  };

  /*
  |--------------------------------------------------------------------------
  | Unread Count
  |--------------------------------------------------------------------------
  |
  | Useful for navbar badges.
  |
  */
  const unreadCount =
    notifications.filter(
      (notification) =>
        notification.read === false
    ).length;

  /*
  |--------------------------------------------------------------------------
  | Context Value
  |--------------------------------------------------------------------------
  |
  | Everything exposed globally.
  |
  */
  const value = {
    notifications,

    unreadCount,

    preferences,

    setPreferences,

    addNotification,

    removeNotification,

    markAsRead,

    markAllAsRead,

    clearNotifications,
  };

  return (
    <NotificationContext.Provider
      value={value}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;