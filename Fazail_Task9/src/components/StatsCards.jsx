export default function StatsCards({
  title,
  value,
  icon: Icon,
  color = "bg-blue-500",
}) {
  return (
    <div
   className="
  bg-white
  dark:bg-gray-900
  rounded-2xl
  border
  border-gray-200
  dark:border-gray-800
  shadow-sm
  p-5
  transition-all
  duration-300
  hover:-translate-y-1
  hover:shadow-xl
"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {value}
          </h2>
        </div>

        <div
          className={`
            ${color}
            w-14
            h-14
            rounded-xl
            flex
            items-center
            justify-center
            text-white
          `}
        >
          <Icon size={28} />
        </div>
      </div>
    </div>
  );
}