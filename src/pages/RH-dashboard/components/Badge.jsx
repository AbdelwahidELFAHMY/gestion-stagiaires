const colorClasses = {
  // Status colors
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
  yellow: "bg-yellow-100 text-yellow-800",
  gray: "bg-gray-100 text-gray-800",

  // Position colors
  blue: "bg-blue-100 text-blue-800",
  purple: "bg-purple-100 text-purple-800",
  indigo: "bg-indigo-100 text-indigo-800",

  // Other colors
  pink: "bg-pink-100 text-pink-800",
  orange: "bg-orange-100 text-orange-800",
};

export default function Badge({
  children,
  color = "gray",
  className = "",
  ...props
}) {
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  const colorClass = colorClasses[color] || colorClasses.gray;

  return (
    <span className={`${baseClasses} ${colorClass} ${className}`} {...props}>
      {children}
    </span>
  );
}
