import { Edit, Eye, Trash2 } from "lucide-react";

function ActionButtons({ onView, onEdit, onDelete }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onView}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
      >
        <Eye size={18} />
      </button>
      <button
        onClick={onEdit}
        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
      >
        <Edit size={18} />
      </button>
      <button
        onClick={onDelete}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
export default ActionButtons;
