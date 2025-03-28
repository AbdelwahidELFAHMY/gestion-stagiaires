import { Plus } from "lucide-react";

function PageHeader({ title, onAdd }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <button
        onClick={onAdd}
        className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
      >
        <Plus size={20} />
        Ajouter
      </button>
    </div>
  );
}
export default PageHeader;
