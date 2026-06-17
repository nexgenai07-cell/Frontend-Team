import {
  Mail,
  Bell,
  RefreshCw,
  Activity,
} from "lucide-react";

export default function ActivityFeed({
  activities = [],
}) {
  const getIcon = (type) => {
    switch (type) {
      case "email":
        return (
          <Mail
            size={18}
            className="text-blue-600"
          />
        );

      case "notification":
        return (
          <Bell
            size={18}
            className="text-yellow-600"
          />
        );

      case "refresh":
        return (
          <RefreshCw
            size={18}
            className="text-green-600"
          />
        );

      default:
        return (
          <Activity
            size={18}
            className="text-purple-600"
          />
        );
    }
  };

  const formatDate = (date) => {
    return new Date(
      date
    ).toLocaleString();
  };

  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        border-gray-100
        p-6
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800">
          Activity Feed
        </h2>

        <span className="text-sm text-gray-500">
          {activities.length} Activities
        </span>
      </div>

      {/* Empty State */}
      {activities.length === 0 ? (
        <div className="text-center py-10">
          <Activity
            size={40}
            className="mx-auto text-gray-300"
          />

          <p className="text-gray-500 mt-3">
            No recent activity
          </p>
        </div>
      ) : (
        <div
          className="
            max-h-125
            overflow-y-auto
            space-y-4
          "
        >
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="
                flex
                gap-4
                border-b
                border-gray-100
                pb-4
              "
            >
              {/* Icon */}
              <div
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-gray-100
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                {getIcon(activity.type)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-gray-800 font-medium">
                  {activity.message}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(
                    activity.createdAt
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}