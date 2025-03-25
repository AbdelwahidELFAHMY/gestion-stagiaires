export default function Skeleton() {
  const isDarkMode = document.documentElement.classList.contains("dark");
  const skeletonBg = isDarkMode ? "#374151" : "#e2e8f0";

  return (
    <div className="animate-pulse">
      <div className="h-6 w-1/2 mx-auto mb-4 rounded bg-gray-300 dark:bg-gray-600"></div>
      <div className="h-64 w-full rounded bg-gray-300 dark:bg-gray-600" style={{ backgroundColor: skeletonBg }}></div>
    </div>
  );
};