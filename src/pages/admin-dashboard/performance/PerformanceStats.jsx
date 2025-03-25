import { TrendingDown, TrendingUp } from "lucide-react";

export default function PerformanceStats({ title, value, icon, change }) {
  return (
    <div className="border-gray-100 dark:border-indigo-800 border-thin cursor-pointer p-5 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm rounded-lg ">
    <div className="flex justify-between">
      <div>
        <p className="text-sm font-medium dark:text-gray-400 text-gray-600">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
        
        {change && (
          <div className="flex items-center mt-2">
            {change.positive ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-xs font-medium ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
              {change.value}
            </span>
          </div>
        )}
      </div>
      
      <div className="rounded-full p-3 dark:bg-gray-700 text-blue-600 bg-gray-100 h-fit">
        {icon}
      </div>
    </div>
  </div>
  )
}
