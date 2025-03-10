import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";

export default function DeleteConfirmation({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="mt-2">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <AlertTriangle size={24} />
          <p className="text-lg font-medium">Confirmation de suppression</p>
        </div>
        <p className="text-gray-600">{message}</p>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          onClick={onClose}
        >
          Annuler
        </button>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Supprimer
        </button>
      </div>
    </Modal>
  );
}
