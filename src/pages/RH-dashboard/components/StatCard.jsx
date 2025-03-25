function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`${color.replace("border-", "text-")} opacity-75`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
export default StatCard;
